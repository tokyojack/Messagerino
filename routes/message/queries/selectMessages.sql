SELECT messages.message, users.username, messages.sender_user_id FROM messages 
	LEFT JOIN users
    	ON messages.sender_user_id = users.id
    WHERE conversation_id=?
    ORDER BY messages.id ASC;