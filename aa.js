import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


// 플리커 쿼리 훅
const fetchFlickr = async ({ queryKey }) => {
	const opt = queryKey[1];
	const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
	const key = 'ae5dbef0587895ed38171fcda4afb648';
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';
	const num = 40;
	let url = '';
	if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
	if (opt.type === 'search') url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
	if (opt.type === 'user') url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;
	const response = await axios.get(url);
	return response.data.photos.photo;
};

export const useFlickrQuery = (opt) => {
	return useQuery(['flickrData', opt], fetchFlickr, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60,
		staleTime: 1000 * 60,
	});
};





// 컴포넌트
import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';
import { useState, useEffect, useRef } from 'react';
import Modal from '../common/Modal';
import { useFlickrQuery } from '../../hooks/useFlickerQuery';

function Gallery() {
	/*
		hooks은 다른 hook이나 일반 함수안쪽에서 호출 불가 : useEffect안쪽이나 이벤트 핸들러 안쪽에서 호출불가, 컴포넌트 안쪽에서만 호출
	*/
	const [Opt, setOpt] = useState({ type: 'user', user: '164021883@N04' });
	const { data: Items, isSuccess } = useFlickrQuery(Opt);
	const openModal = useRef(null);
	const isUser = useRef(true);
	const searchInput = useRef(null);
	const btnSet = useRef(null);
	const enableEvent = useRef(true);
	const frame = useRef(null);
	const [Loader, setLoader] = useState(true);
	const [Index, setIndex] = useState(0);
	const counter = useRef(0);
	const firstLoaded = useRef(true);

	const resetGallery = (e) => {
		const btns = btnSet.current.querySelectorAll('button');
		btns.forEach((el) => el.classList.remove('on'));
		e.target.classList.add('on');
		enableEvent.current = false;
		setLoader(true);
		frame.current.classList.remove('on');
	};

	const showInterest = (e) => {
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		resetGallery(e);
		setOpt({ type: 'interest' });
		isUser.current = false;
	};

	const showMine = (e) => {
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		resetGallery(e);
		setOpt({ type: 'user', user: '164021883@N04' });
	};

	const showSearch = (e) => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');
		if (!enableEvent.current) return;

		resetGallery(e);
		setOpt({ type: 'search', tags: tag });
		searchInput.current.value = '';
		isUser.current = false;
	};

	useEffect(() => {
		console.log(Items);
		counter.current = 0;
		if (isSuccess && Items.length === 0 && !firstLoaded.current) {
			setLoader(false);
			frame.current.classList.add('on');
			const btnMine = btnSet.current.children;
			btnMine[1].classList.add('on');
			setOpt({ type: 'user', user: '164021883@N04' });
			enableEvent.current = true;
			return alert('이미지 결과값이 없습니다.');
		}
		firstLoaded.current = false;
		const imgs = frame.current.querySelectorAll('img');

		imgs.forEach((img) => {
			img.onload = () => {
				++counter.current;

				if (counter.current === imgs.length - 2) {
					setLoader(false);
					frame.current.classList.add('on');
					enableEvent.current = true;
				}
			};
		});
	}, [Items]);

	return (
		<>
			<Layout name={'Gallery'} bg={'Gallery.jpg'}>
				<div className='btnSet' ref={btnSet}>
					<button onClick={showInterest}>Interest Gallery</button>

					<button className='on' onClick={showMine}>
						My Gallery
					</button>
				</div>

				<div className='searchBox'>
					<input
						type='text'
						placeholder='검색어를 입력하세요.'
						ref={searchInput}
						onKeyPress={(e) => e.key === 'Enter' && showSearch(e)}
					/>
					<button onClick={showSearch}>Seach</button>
				</div>

				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
						{isSuccess &&
							Items.map((item, idx) => {
								return (
									<article key={idx}>
										<div className='inner'>
											<div
												className='pic'
												onClick={() => {
													openModal.current?.open();
													setIndex(idx);
													console.log(openModal);
												}}
											>
												<img
													src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
													alt={item.title}
												/>
											</div>
											<h2>{item.title}</h2>
											<div className='profile'>
												<img
													src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
													alt={item.owner}
													onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
												/>
												<span
													onClick={(e) => {
														if (isUser.current) return;
														isUser.current = true;
														setLoader(true);
														frame.current.classList.remove('on');
														setOpt({ type: 'user', user: e.target.innerText });
													}}
												>
													{item.owner}
												</span>
											</div>
										</div>
									</article>
								);
							})}
					</Masonry>
				</div>
				{Loader && <img className='loader' src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt='loader' />}
			</Layout>

			<Modal ref={openModal}>
				{isSuccess && (
					<img
						src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_b.jpg`}
						alt={Items[Index]?.title}
					/>
				)}
			</Modal>
		</>
	);
}

export default Gallery;