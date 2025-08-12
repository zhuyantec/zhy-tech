import React, { useState } from 'react';
import Image from "next/legacy/image"; // For icons
import { NextPage } from 'next'; // Import types
import { useTranslation } from 'next-i18next'; // Import useTranslation
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'; // Import helpers
import { COMPANY_NAME } from '../../lib/companyConfig';
import { web3formsConfig, Web3FormsData, Web3FormsResponse } from '../../config/email';

// Define namespaces required for this page
const namespacesRequired = ['common', 'navbar', 'footer', 'contact'];

const ContactPage: NextPage = () => {
  const { t } = useTranslation('contact'); // Use 'contact' namespace

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 准备 Web3Forms 数据
      const web3formsData: Web3FormsData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        access_key: web3formsConfig.accessKey,
      };

      // 发送到 Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(web3formsData),
      });

      const result: Web3FormsResponse = await response.json();
      console.log(result);
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        // 显示成功消息
        alert(t('form.successMessage', { defaultValue: "消息已发送！我们会尽快与您联系。"}));
      } else {
        alert(t('form.errorMessage', { defaultValue: "发送失败，请稍后重试或直接联系我们。"}));
      }
    } catch (error) {
      console.error('Web3Forms sending error:', error);
      setSubmitStatus('error');
      // 显示错误消息
      alert(t('form.errorMessage', { defaultValue: "发送失败，请稍后重试或直接联系我们。"}));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 py-16 md:py-24 px-4">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--secondary)] font-[Poppins] mb-4">
            {t('pageTitle', { defaultValue: '联系我们'})}
          </h1>
          <p className="text-lg md:text-xl text-[var(--accent-gray)] font-[Asap] max-w-3xl mx-auto">
            {t('pageDescription', { defaultValue: '我们很乐意听到您的声音！无论您是咨询合作、寻求支持还是有任何疑问，请随时与我们联系。'})}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column: Contact Info & Hours */}
          <div className="bg-white p-8 rounded-lg shadow-md">
             <h2 className="text-2xl md:text-3xl font-semibold text-black font-[Poppins] mb-6">{t('info.title', { defaultValue: '联系方式'})}</h2>
             <ul className="space-y-4">
               <li className="flex items-center space-x-3">
                  <Image src="/icons/phone.svg" alt={t('info.phoneAlt', { defaultValue: '电话'})} width={24} height={24} className="text-[var(--primary)]"/>
                 <span className="text-gray-700 font-[Asap]">{t('info.phoneNumber', { defaultValue: '+86 138 1234 5678'})}</span>
               </li>
               <li className="flex items-center space-x-3">
                  <Image src="/icons/email.svg" alt={t('info.emailAlt', { defaultValue: '邮箱'})} width={24} height={24}/>
                 <span className="text-gray-700 font-[Asap]">{t('info.emailAddress', { defaultValue: `info@${COMPANY_NAME.toLowerCase()}.com` })}</span>
               </li>
               <li className="flex items-start space-x-3">
                  <Image src="/icons/location.svg" alt={t('info.addressAlt', { defaultValue: '地址'})} width={24} height={24} className="mt-1"/>
                 <span className="text-gray-700 font-[Asap] leading-relaxed">
                   {t('info.address', { defaultValue: '示例地址, 某某区, 某某市, 中国'})}
                 </span>
               </li>
                <li className="flex items-center space-x-3 pt-4 border-t mt-4">
                  <Image src="/icons/schedule.svg" alt={t('info.hoursAlt', { defaultValue: '工作时间'})} width={24} height={24}/>
                 <span className="text-gray-700 font-[Asap]">
                    {t('info.hours', { defaultValue: '周一至周五 08:00 - 18:00 / 周日 08:00 - 14:00'})}
                 </span>
               </li>
             </ul>
             {/* Optional: Map */}
             {/* <div className="mt-8 h-64 bg-gray-200 rounded-md">地图嵌入位置</div> */}
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold text-black font-[Poppins] mb-6">{t('form.title', { defaultValue: '给我们留言'})}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t('form.nameLabel', { defaultValue: '姓名'})}</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] transition duration-150 ease-in-out"
                />
              </div>
               <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('form.emailLabel', { defaultValue: '邮箱'})}</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] transition duration-150 ease-in-out"
                />
              </div>
               <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">{t('form.subjectLabel', { defaultValue: '主题'})}</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] transition duration-150 ease-in-out"
                />
              </div>
              <div>
                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{t('form.messageLabel', { defaultValue: '消息内容'})}</label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] transition duration-150 ease-in-out"
                ></textarea>
              </div>
              <div>
                 <button
                   type="submit"
                   disabled={isSubmitting}
                   className={`w-full font-semibold py-3 px-4 rounded-md transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] ${
                     isSubmitting 
                       ? 'bg-gray-400 cursor-not-allowed' 
                       : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]'
                   }`}
                 >
                   {isSubmitting 
                     ? t('form.sendingButton', { defaultValue: '发送中...'})
                     : t('form.submitButton', { defaultValue: '发送消息'})
                   }
                 </button>
              </div>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  {t('form.successMessage', { defaultValue: "消息已发送！我们会尽快与您联系。"})}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {t('form.errorMessage', { defaultValue: "发送失败，请稍后重试或直接联系我们。"})}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Use the helper to generate getStaticProps
const getStaticProps = makeStaticProps(namespacesRequired);

// Export getStaticPaths and getStaticProps
export { getStaticPaths, getStaticProps };

export default ContactPage; 