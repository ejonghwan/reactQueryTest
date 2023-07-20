const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const PORT = 5500;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/build')));
dotenv.config()
// app.use(cors({
//     origin: process.env.DOMAIN,
//     credentials: true
// }))

const { Post } = require('./model/postSchema.js');

mongoose.connect(process.env.MONGO_URI, {}).then(() => {
    try {
        console.log('mongodb connect');

        app.get('/', (req, res) => {
			//서버에서 5000포트로 접속하면 static폴더로 지정되어 있는 build안쪽의 index.html을 화면에 내보냄
			res.sendFile(path.join(__dirname, '../client/build/index.html'));
		});
		
		//어떤 URL에서 접속하더라도 화면이 뜨도록 설정
		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, '../client/build/index.html'));
		});
		
		//리액트로부터 전달된 요청 라우터
		app.post('/api/send', (req, res) => {
			console.log(req.body);
			res.json({ success: true, result: req.body.name + '2' });
		});

		//create
		app.post('/api/create', (req, res) => {
			//PostSchema가 적용된 Post모델 생성자를 통해 저장 모델 인스턴스 생성
			const PostModel = new Post({
				title: req.body.title,
				content: req.body.content,
			});

			//생성된 모델 인스턴스로부터 save명령어로 DB저장 (Promise반환)
			PostModel.save()
				.then(() => res.json({ success: true }))
				.catch(() => res.json({ success: false }));
		});

		//read
		app.post('/api/read', (req, res) => {
			Post.find()
				.exec()
				.then((doc) => {
					console.log(doc);
					res.json({ success: true, communityList: doc });
				})
				.catch((err) => {
					console.log(err);
					res.json({ success: false });
				});
		});


		
        app.listen(PORT, () => console.log('express server listening port ' + PORT));

    } catch(err) {
        console.error(err)
    }
})
