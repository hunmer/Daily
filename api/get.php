
<?php

			$ch = curl_init();
			$options =  array(
				CURLOPT_HEADER => false,
				CURLOPT_URL => urldecode($_GET['url']),
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_TIMEOUT => 30,
				CURLOPT_FOLLOWLOCATION => false,
                 CURLOPT_PROXYAUTH => CURLAUTH_BASIC,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false,
    CURLOPT_PROXY => "127.0.0.1",
    CURLOPT_PROXYPORT => 1080,
        CURLOPT_HTTPHEADER => [
          'accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
					'accept-encoding' => 'gzip, deflate, br',
					'accept-language' => 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
					'cache-control' => 'no-cache',
					'pragma' => 'no-cache',
					'sec-ch-ua' => '"Microsoft Edge";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
					'sec-ch-ua-mobile' => '?0',
					'sec-ch-ua-platform' => 'Windows',
					'sec-fetch-dest' => 'document',
					'sec-fetch-mode' => 'navigate',
					'sec-fetch-site' => 'none',
					'sec-fetch-user' => '?1',
					'upgrade-insecure-requests' => '1',
        ],
			);
			curl_setopt_array($ch, $options);
			$content = curl_exec($ch);
			curl_close($ch);
		var_dump($content);
