Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase
$ErrorActionPreference = 'Stop'
$output = 'F:\projects\personal-website\hotchkiss-frame-1.png'
$videoPath = 'C:\Users\Yang\Downloads\dc3bb730f2f66726b0493c5f0127263c.mp4'
$player = New-Object System.Windows.Media.MediaPlayer
$opened = New-Object System.Threading.AutoResetEvent($false)
$script:failed = $null
$player.add_MediaOpened({ $opened.Set() | Out-Null })
$player.add_MediaFailed({ param($s, $e) $script:failed = $e.ErrorException.Message; $opened.Set() | Out-Null })
$player.Open([Uri]$videoPath)
if (-not $opened.WaitOne(10000)) { throw 'Timed out opening media.' }
if ($script:failed) { throw $script:failed }
$player.Position = [TimeSpan]::FromSeconds(2)
Start-Sleep -Milliseconds 700
$width = if ($player.NaturalVideoWidth -gt 0) { $player.NaturalVideoWidth } else { 1280 }
$height = if ($player.NaturalVideoHeight -gt 0) { $player.NaturalVideoHeight } else { 720 }
$visual = New-Object System.Windows.Media.DrawingVisual
$context = $visual.RenderOpen()
$context.DrawVideo($player, (New-Object System.Windows.Rect(0, 0, $width, $height)))
$context.Close()
$bitmap = New-Object System.Windows.Media.Imaging.RenderTargetBitmap($width, $height, 96, 96, [System.Windows.Media.PixelFormats]::Pbgra32)
$bitmap.Render($visual)
$encoder = New-Object System.Windows.Media.Imaging.PngBitmapEncoder
$encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($bitmap))
$stream = [System.IO.File]::Open($output, [System.IO.FileMode]::Create)
$encoder.Save($stream)
$stream.Close()
$player.Close()
Get-Item -LiteralPath $output | Select-Object FullName, Length, LastWriteTime | Format-List
