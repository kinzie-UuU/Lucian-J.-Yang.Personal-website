$ErrorActionPreference = 'Stop'
$code = @"
using System;
using System.Drawing;
using System.Runtime.InteropServices;

[StructLayout(LayoutKind.Sequential)]
public struct SIZE {
    public int cx;
    public int cy;
}

[Flags]
public enum SIIGBF {
    RESIZETOFIT = 0x00,
    BIGGERSIZEOK = 0x01,
    MEMORYONLY = 0x02,
    ICONONLY = 0x04,
    THUMBNAILONLY = 0x08,
    INCACHEONLY = 0x10
}

[ComImport]
[Guid("bcc18b79-ba16-442f-80c4-8a59c30c463b")]
[InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
public interface IShellItemImageFactory {
    void GetImage(SIZE size, SIIGBF flags, out IntPtr phbm);
}

public static class ShellThumbnail {
    [DllImport("shell32.dll", CharSet = CharSet.Unicode, PreserveSig = false)]
    private static extern void SHCreateItemFromParsingName(
        string pszPath,
        IntPtr pbc,
        [MarshalAs(UnmanagedType.LPStruct)] Guid riid,
        [MarshalAs(UnmanagedType.Interface)] out IShellItemImageFactory ppv);

    [DllImport("gdi32.dll")]
    private static extern bool DeleteObject(IntPtr hObject);

    public static void SaveThumbnail(string inputPath, string outputPath, int width, int height) {
        Guid guid = new Guid("bcc18b79-ba16-442f-80c4-8a59c30c463b");
        IShellItemImageFactory factory;
        SHCreateItemFromParsingName(inputPath, IntPtr.Zero, guid, out factory);
        SIZE size;
        size.cx = width;
        size.cy = height;
        IntPtr hBitmap;
        factory.GetImage(size, SIIGBF.BIGGERSIZEOK, out hBitmap);
        using (Bitmap bitmap = Bitmap.FromHbitmap(hBitmap)) {
            bitmap.Save(outputPath, System.Drawing.Imaging.ImageFormat.Png);
        }
        DeleteObject(hBitmap);
    }
}
"@
Add-Type -TypeDefinition $code -ReferencedAssemblies 'System.Drawing.dll'
$input = 'C:\Users\Yang\Downloads\dc3bb730f2f66726b0493c5f0127263c.mp4'
$output = 'F:\projects\personal-website\hotchkiss-thumb.png'
[ShellThumbnail]::SaveThumbnail($input, $output, 1280, 720)
Get-Item -LiteralPath $output | Select-Object FullName, Length, LastWriteTime | Format-List
