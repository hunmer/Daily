var res = http.get('http://192.168.23.1/halfmoon/halfmoon.zip');
if (res.statusCode != 200) {
    toast("请求失败");
    exit();
}
var zipFile = "/sdcard/halfmoon.zip";
files.writeBytes(zipFile, res.body.bytes());
toast("下载成功");
var path = '/sdcard/1/';
files.removeDir(path);
$zip.unzip(zipFile, path);
toast("解压成功");