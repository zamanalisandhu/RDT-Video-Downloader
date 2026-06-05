Add-Type -AssemblyName System.Drawing

$sizes = @(16, 48, 128)
$src = [System.Drawing.Image]::FromFile("D:\Reddit Vid Down\public\logo.png")

foreach ($s in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap($s, $s)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.DrawImage($src, 0, 0, $s, $s)
    $g.Dispose()
    $outPath = "D:\Reddit Vid Down\extension\icons\icon$s.png"
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Created icon${s}.png"
}

$src.Dispose()
Write-Host "Done!"
