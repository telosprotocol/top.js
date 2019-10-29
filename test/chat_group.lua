-- 简单聊天程序,首先需要加入聊天add_user,然后调用send_chat发送聊天
IN 	            = '1';
OUT             = '0';
MAX_NUMBER      = 3;--最大聊天记录数
MAX_CONTENT_LEN = 128;--最长聊天内容
CHAT_USERS_KEY 	= 'chat_users';
CHAT_KEY 		= 'chat';
SENDER 			= 'sender';
RECEIVER 		= 'receiver';
TIMESTAMP 		= 'timestamp';
CONTENT			= 'content';
-- 初始化方法
function init()
    lcreate(CHAT_KEY);
	hcreate(CHAT_USERS_KEY);
end
-- 添加用户
function add_user()
	hset(CHAT_USERS_KEY, exec_account(), IN);
end
-- 删除用户
function del_user()
	hset(CHAT_USERS_KEY, exec_account(), OUT);
end
--[[
发送聊天
timestamp 	时间戳
content		聊天内容
--]]
function send_chat(timestamp, content)
	local sender = exec_account();
	local sender_user_state = hget(CHAT_USERS_KEY, sender);
	if sender_user_state ~= IN then
		error('user first need add to chat_users');
	end
	-- 判断消息内容长度，超过限制则报错退出
	if #content >= MAX_CONTENT_LEN then 
		error('content length must less than '.. MAX_CONTENT_LEN);
	end
	-- 判断消息池大小，超过最大限制则移除map最左的对象
	if llen(CHAT_KEY) >= MAX_NUMBER then
		lpop(CHAT_KEY);
	end
    local chat_info = '{"'.. SENDER .. '":"' .. sender .. '","'.. TIMESTAMP .. '":' .. timestamp ..',"'.. CONTENT .. '":"' .. content .. '"}';
	rpush(CHAT_KEY, chat_info);
end