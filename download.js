var res = http.get('http://192.168.23.1/halfmoon/halfmoon.zip');
if (res.statusCode != 200) {
	return toast("请求失败");
}
var saveTo = "/sdcard/halfmoon.zip";
files.writeBytes(saveTo, res.body.bytes());
toast("下载成功");
$zip.unzip(saveTo, '/sdcard/1/');
toast("解压成功");
