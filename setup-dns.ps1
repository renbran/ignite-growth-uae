# Cloudflare DNS Setup Script for sgctech.ai
# This script configures DNS records for your custom domain

# ============================================
# CONFIGURATION - UPDATE ONLY THE API TOKEN
# ============================================

# Get this from Cloudflare Dashboard > My Profile > API Tokens
$CLOUDFLARE_API_TOKEN = "Hekk63nnAkr5aLtUbwhulzISqI7dcQr-hef-Pw-p"  # Needs Zone:DNS:Edit permissions

$DOMAIN = "sgctech.ai"
$PROJECT_NAME = "ignite-growth-uae"
$PAGES_DOMAIN = "$PROJECT_NAME.pages.dev"

# ============================================
# SCRIPT START
# ============================================

Write-Host "🚀 Setting up DNS for $DOMAIN..." -ForegroundColor Cyan

# Set headers
$headers = @{
    "Authorization" = "Bearer $CLOUDFLARE_API_TOKEN"
    "Content-Type" = "application/json"
}

# ============================================
# AUTO-FETCH: Get Zone ID and Account ID
# ============================================

Write-Host "`n📋 Auto-fetching Zone ID and Account ID..." -ForegroundColor Yellow

try {
    # Get all zones to find sgctech.ai
    $zonesResponse = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones?name=$DOMAIN" -Method Get -Headers $headers
    
    if ($zonesResponse.result.Count -eq 0) {
        Write-Host "❌ Domain $DOMAIN not found in your Cloudflare account!" -ForegroundColor Red
        Write-Host "   Make sure the domain is added to Cloudflare first." -ForegroundColor Yellow
        exit 1
    }
    
    $CLOUDFLARE_ZONE_ID = $zonesResponse.result[0].id
    $CLOUDFLARE_ACCOUNT_ID = $zonesResponse.result[0].account.id
    
    Write-Host "✅ Found Zone ID: $CLOUDFLARE_ZONE_ID" -ForegroundColor Green
    Write-Host "✅ Found Account ID: $CLOUDFLARE_ACCOUNT_ID" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to fetch Zone/Account IDs: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Please check your API token has the correct permissions." -ForegroundColor Yellow
    exit 1
}

# ============================================
# STEP 1: Add Custom Domain to Cloudflare Pages
# ============================================

Write-Host "`n📋 Step 1: Adding custom domain to Cloudflare Pages..." -ForegroundColor Yellow

$pagesUrl = "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$PROJECT_NAME/domains"

# Add root domain
$rootDomainBody = @{
    name = $DOMAIN
} | ConvertTo-Json

try {
    $rootResponse = Invoke-RestMethod -Uri $pagesUrl -Method Post -Headers $headers -Body $rootDomainBody
    Write-Host "✅ Added $DOMAIN to Pages project" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Root domain might already exist: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Add www subdomain
$wwwDomainBody = @{
    name = "www.$DOMAIN"
} | ConvertTo-Json

try {
    $wwwResponse = Invoke-RestMethod -Uri $pagesUrl -Method Post -Headers $headers -Body $wwwDomainBody
    Write-Host "✅ Added www.$DOMAIN to Pages project" -ForegroundColor Green
} catch {
    Write-Host "⚠️  WWW domain might already exist: $($_.Exception.Message)" -ForegroundColor Yellow
}

# ============================================
# STEP 2: Get Existing DNS Records
# ============================================

Write-Host "`n📋 Step 2: Checking existing DNS records..." -ForegroundColor Yellow

$dnsUrl = "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records"

try {
    $existingRecords = Invoke-RestMethod -Uri $dnsUrl -Method Get -Headers $headers
    
    # Check for existing @ and www records
    $rootRecord = $existingRecords.result | Where-Object { $_.name -eq $DOMAIN -and $_.type -eq "CNAME" }
    $wwwRecord = $existingRecords.result | Where-Object { $_.name -eq "www.$DOMAIN" -and $_.type -eq "CNAME" }
    
    Write-Host "Found $($existingRecords.result.Count) existing DNS records" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Failed to retrieve DNS records: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# ============================================
# STEP 3: Create/Update DNS Records
# ============================================

Write-Host "`n📋 Step 3: Creating DNS records..." -ForegroundColor Yellow

# Function to create or update DNS record
function Set-DNSRecord {
    param(
        [string]$Name,
        [string]$Type,
        [string]$Content,
        [bool]$Proxied = $true
    )
    
    $recordBody = @{
        type = $Type
        name = $Name
        content = $Content
        ttl = 1  # Auto when proxied
        proxied = $Proxied
    } | ConvertTo-Json
    
    # Check if record exists
    $existing = $existingRecords.result | Where-Object { 
        $_.name -eq $Name -and $_.type -eq $Type 
    } | Select-Object -First 1
    
    if ($existing) {
        # Update existing record
        $updateUrl = "$dnsUrl/$($existing.id)"
        try {
            $response = Invoke-RestMethod -Uri $updateUrl -Method Patch -Headers $headers -Body $recordBody
            Write-Host "✅ Updated $Type record: $Name → $Content" -ForegroundColor Green
        } catch {
            Write-Host "❌ Failed to update $Name : $($_.Exception.Message)" -ForegroundColor Red
        }
    } else {
        # Create new record
        try {
            $response = Invoke-RestMethod -Uri $dnsUrl -Method Post -Headers $headers -Body $recordBody
            Write-Host "✅ Created $Type record: $Name → $Content" -ForegroundColor Green
        } catch {
            Write-Host "❌ Failed to create $Name : $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

# Create CNAME records
Set-DNSRecord -Name $DOMAIN -Type "CNAME" -Content $PAGES_DOMAIN -Proxied $true
Set-DNSRecord -Name "www.$DOMAIN" -Type "CNAME" -Content $PAGES_DOMAIN -Proxied $true

# ============================================
# STEP 4: Verify Configuration
# ============================================

Write-Host "`n📋 Step 4: Verifying DNS configuration..." -ForegroundColor Yellow

Start-Sleep -Seconds 3

try {
    $verifyRecords = Invoke-RestMethod -Uri $dnsUrl -Method Get -Headers $headers
    $rootCNAME = $verifyRecords.result | Where-Object { $_.name -eq $DOMAIN -and $_.type -eq "CNAME" }
    $wwwCNAME = $verifyRecords.result | Where-Object { $_.name -eq "www.$DOMAIN" -and $_.type -eq "CNAME" }
    
    if ($rootCNAME -and $wwwCNAME) {
        Write-Host "✅ DNS records configured successfully!" -ForegroundColor Green
        Write-Host "`nCurrent DNS Configuration:" -ForegroundColor Cyan
        Write-Host "  $($rootCNAME.name) → $($rootCNAME.content) (Proxied: $($rootCNAME.proxied))" -ForegroundColor White
        Write-Host "  $($wwwCNAME.name) → $($wwwCNAME.content) (Proxied: $($wwwCNAME.proxied))" -ForegroundColor White
    } else {
        Write-Host "⚠️  DNS records created but verification incomplete" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Could not verify DNS records: $($_.Exception.Message)" -ForegroundColor Yellow
}

# ============================================
# COMPLETION
# ============================================

Write-Host "`n✅ DNS Setup Complete!" -ForegroundColor Green
Write-Host "`n📌 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Wait 5-15 minutes for DNS propagation" -ForegroundColor White
Write-Host "  2. Test your domain: https://$DOMAIN" -ForegroundColor White
Write-Host "  3. SSL certificate will auto-provision within 24 hours" -ForegroundColor White
Write-Host "`n[LINK] Temporary access: https://$PAGES_DOMAIN" -ForegroundColor White

Write-Host "`n[SUCCESS] Done!" -ForegroundColor Green
