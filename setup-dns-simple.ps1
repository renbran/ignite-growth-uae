# Cloudflare DNS Setup Script for sgctech.ai
# Simple version - Just add your API Token below

# ===========================================
# CONFIGURATION
# ===========================================
$API_TOKEN = "Hekk63nnAkr5aLtUbwhulzISqI7dcQr-hef-Pw-p"
$DOMAIN = "sgctech.ai"
$PROJECT = "ignite-growth-uae"
$TARGET = "$PROJECT.pages.dev"

# ===========================================
# SCRIPT
# ===========================================
$headers = @{
    "Authorization" = "Bearer $API_TOKEN"
    "Content-Type" = "application/json"
}

Write-Host "Setting up DNS for $DOMAIN..." -ForegroundColor Cyan

# Get Zone and Account IDs
Write-Host "Fetching Zone ID..." -ForegroundColor Yellow
try {
    $zones = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones?name=$DOMAIN" -Headers $headers
    $zoneId = $zones.result[0].id
    $accountId = $zones.result[0].account.id
    Write-Host "Zone ID: $zoneId" -ForegroundColor Green
    Write-Host "Account ID: $accountId" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Cannot fetch zone info - $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Add domain to Pages project
Write-Host "`nAdding domains to Cloudflare Pages..." -ForegroundColor Yellow
$pagesUrl = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$PROJECT/domains"

@($DOMAIN, "www.$DOMAIN") | ForEach-Object {
    $domainName = $_
    $body = @{ name = $domainName } | ConvertTo-Json
    try {
        Invoke-RestMethod -Uri $pagesUrl -Method Post -Headers $headers -Body $body | Out-Null
        Write-Host "Added: $domainName" -ForegroundColor Green
    } catch {
        Write-Host "Domain exists: $domainName" -ForegroundColor Yellow
    }
}

# Get existing DNS records
Write-Host "`nChecking DNS records..." -ForegroundColor Yellow
$dnsUrl = "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records"
$records = Invoke-RestMethod -Uri $dnsUrl -Headers $headers

# Create or update DNS records
Write-Host "Creating DNS CNAME records..." -ForegroundColor Yellow

function Set-DNS {
    param($Name, $Target)
    
    $existing = $records.result | Where-Object { $_.name -eq $Name -and $_.type -eq "CNAME" }
    $body = @{
        type = "CNAME"
        name = $Name
        content = $Target
        ttl = 1
        proxied = $true
    } | ConvertTo-Json
    
    if ($existing) {
        $url = "$dnsUrl/$($existing.id)"
        Invoke-RestMethod -Uri $url -Method Patch -Headers $headers -Body $body | Out-Null
        Write-Host "Updated: $Name -> $Target" -ForegroundColor Green
    } else {
        Invoke-RestMethod -Uri $dnsUrl -Method Post -Headers $headers -Body $body | Out-Null
        Write-Host "Created: $Name -> $Target" -ForegroundColor Green
    }
}

Set-DNS -Name $DOMAIN -Target $TARGET
Set-DNS -Name "www.$DOMAIN" -Target $TARGET

# Verify
Write-Host "`nVerifying configuration..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
$verify = Invoke-RestMethod -Uri $dnsUrl -Headers $headers
$rootDNS = $verify.result | Where-Object { $_.name -eq $DOMAIN -and $_.type -eq "CNAME" }
$wwwDNS = $verify.result | Where-Object { $_.name -eq "www.$DOMAIN" -and $_.type -eq "CNAME" }

if ($rootDNS -and $wwwDNS) {
    Write-Host "`nSUCCESS! DNS configured:" -ForegroundColor Green
    Write-Host "  $($rootDNS.name) -> $($rootDNS.content)" -ForegroundColor White
    Write-Host "  $($wwwDNS.name) -> $($wwwDNS.content)" -ForegroundColor White
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "  1. Wait 5-15 minutes for DNS propagation" -ForegroundColor White
    Write-Host "  2. Visit: https://$DOMAIN" -ForegroundColor White
    Write-Host "  3. SSL auto-provisions within 24 hours" -ForegroundColor White
} else {
    Write-Host "WARNING: Could not verify DNS records" -ForegroundColor Yellow
}

Write-Host "`nDone!" -ForegroundColor Green
