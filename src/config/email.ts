// Web3Forms 配置
export const web3formsConfig = {
  // Web3Forms API Key
  accessKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_API_KEY_HERE',
};

// Web3Forms 表单数据接口
export interface Web3FormsData {
  name: string;
  email: string;
  message: string;
  access_key: string;
  subject?: string;
}

// Web3Forms 响应接口
export interface Web3FormsResponse {
  success: boolean;
  message: string;
} 