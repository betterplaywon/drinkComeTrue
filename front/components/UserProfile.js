/**
 * @deprecated
 * 2023.02.09
 * 사용하지 않는 컴포넌트
 */

// import React, { useCallback } from 'react';
// import { Avatar, Card, Button } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { LOG_OUT_REQUEST } from '../actionType';
// import Link from 'next/link';

// import GoogleLogOutButton from './GoogleLogOutButton';
// import { useSession } from 'next-auth/react';

// const UserProfile = () => {
//   const dispatch = useDispatch();
//   const { Meta } = Card;
//   const { user, logOutLoading } = useSelector(state => state.user);
//   const { data } = useSession();

//   const handleLogout = useCallback(() => {
//     dispatch({ type: LOG_OUT_REQUEST });
//   }, []);

//   return (
//     <>
//       {user ? (
//         <Card
//           cover={<img alt="drinkGroup" src="https://platum.kr/wp-content/uploads/2017/11/thebooth2-1024x683.jpg" />}
//           actions={[
//             <div key="twit">
//               게시글
//               <br /> {user.Posts.length}
//             </div>,
//             <div key="followers">
//               <Link href="/profile">
//                 <a>
//                   친구들
//                   <br /> {user.Followers.length}
//                 </a>
//               </Link>
//             </div>,
//             <div key="followings">
//               <Link href="/profile">
//                 <a>
//                   팬들
//                   <br /> {user.Followings.length}
//                 </a>
//               </Link>
//             </div>,
//           ]}
//         >
//           <Meta
//             avatar={<Avatar>{user.nickname[0]}</Avatar>}
//             title={user.nickname}
//             description="오늘은 술을 얼마나 마셨나요"
//             style={{ marginBottom: '10px' }}
//           />
//           <Button onClick={handleLogout} loading={logOutLoading}>
//             로그아웃
//           </Button>
//         </Card>
//       ) : (
//         <Card>
//           <GoogleLogOutButton />
//         </Card>
//       )}
//     </>
//   );
// };

// export default UserProfile;
