import { createStandaloneToast } from "@chakra-ui/react";
import { getCookie } from '@/utils/cookie';

const { toast } = createStandaloneToast();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (url = "", data = {} as any, type = "GET") => {
	const baseUrl = process.env.NODE_ENV === 'development' ? 
		'http://localhost:3000/api' :
		'https://stevenfeng.cn/api'; // 基础路径
	type = type.toUpperCase(); // 请求方式小写转换成大写
	url = baseUrl + url; // 请求地址的拼接

	if (type == "GET") {
		let dataStr = ""; //数据拼接字符串
		Object.keys(data).forEach((key) => {
			dataStr += key + "=" + data[key] + "&";
		});
		if (dataStr !== "") {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
			url = url + "?" + dataStr;
		}
	}
	let requestConfig: any = {
		credentials: "same-origin",
		method: type,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		mode: "cors", // 用来决定是否允许跨域请求  值有 三个 same-origin，no-cors（默认）以及 cores;
		cache: "force-cache", // 是否缓存请求资源 可选值有 default 、 no-store 、 reload 、 no-cache 、 force-cache 或者 only-if-cached 。
	};

	const TOKEN = getCookie('TOKEN') ? getCookie('TOKEN') : '';
	console.log(TOKEN);
	if (TOKEN) {
		requestConfig.headers['Authorization'] = `Bearer ${TOKEN}`;
	}
	console.log(requestConfig);

	if (type == "POST") {
		Object.defineProperty(requestConfig, "body", {
			value: JSON.stringify(data),
		});
	}
	try {
		const response = await fetch(url, requestConfig as any);

		const responseJson = await response.json();
		if (responseJson.code === 0) {
			return responseJson;
		} else if (responseJson.code === 400) {
			toast({
				title: responseJson.msg || 'Error!',
				status: 'error',
				position: 'top',
				isClosable: true,
			});
			return responseJson;
		}
		console.log(responseJson);
		
	} catch (error) {
		toast({
			title: 'Error!',
			status: 'error',
			position: 'top',
			isClosable: true,
		});
		console.error(error);
	}
};
 