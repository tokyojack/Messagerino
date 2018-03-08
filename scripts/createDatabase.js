var mysql = require('mysql');

var config = require('../config/config');
var connection = mysql.createConnection(config.db);

connection.query('CREATE TABLE `conversations` (\
 `id` int(11) NOT NULL AUTO_INCREMENT, \
 `user_1` int(11) NOT NULL, \
 `user_2` int(11) NOT NULL, \
 PRIMARY KEY (`id`), \
 KEY `user_1` (`user_1`), \
 KEY `user_2` (`user_2`) \
) ENGINE=MyISAM AUTO_INCREMENT=60 DEFAULT CHARSET=latin1');

connection.query('CREATE TABLE `messages` (\
 `id` int(11) NOT NULL AUTO_INCREMENT,\
 `message` varchar(255) NOT NULL,\
 `sender_user_id` int(11) NOT NULL,\
 `conversation_id` int(11) NOT NULL,\
 PRIMARY KEY (`id`),\
 KEY `conversation_id` (`conversation_id`),\
 KEY `user_id` (`sender_user_id`) USING BTREE\
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=latin1');

connection.query('CREATE TABLE `users` (\
 `id` int(11) NOT NULL AUTO_INCREMENT,\
 `username` varchar(50) NOT NULL,\
 `password` char(60) NOT NULL,\
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,\
 PRIMARY KEY (`id`),\
 UNIQUE KEY `username` (`username`)\
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1');

console.log('Success: Database Created!');

connection.end();