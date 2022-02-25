import { BsStars } from 'react-icons/bs'
import TweetBox from './TweetBox'
import Post from '../Post'

const style = {
  wrapper: `flex-[2] border-r border-l border-[#38444d]`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}

const tweets = [
  {
    displayName: 'Brandy',
    userName: '0x5c2FBe8585e8C1aBcfCBC2765629c3d479fAE077',
    avatar:
      'https://avatars.githubusercontent.com/u/64588461?s=400&u=d3f63182f9eafa6ba6f550301c02a9ee26faec65&v=4',
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2022-01-01T12:00:00.000Z',
  },
  {
    displayName: 'Brandy',
    userName: '0x5c2FBe8585e8C1aBcfCBC2765629c3d479fAE077',
    avatar:
      'https://avatars.githubusercontent.com/u/64588461?s=400&u=d3f63182f9eafa6ba6f550301c02a9ee26faec65&v=4',
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2022-02-25T03:00:00.000Z',
  },
  {
    displayName: 'Brandy',
    userName: '0x5c2FBe8585e8C1aBcfCBC2765629c3d479fAE077',
    avatar:
      'https://avatars.githubusercontent.com/u/64588461?s=400&u=d3f63182f9eafa6ba6f550301c02a9ee26faec65&v=4',
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2019-06-01T12:00:00.000Z',
  },
  {
    displayName: 'Brandy',
    userName: '0x5c2FBe8585e8C1aBcfCBC2765629c3d479fAE077',
    avatar:
      'https://avatars.githubusercontent.com/u/64588461?s=400&u=d3f63182f9eafa6ba6f550301c02a9ee26faec65&v=4',
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2022-02-22T12:00:00.000Z',
  },
]

const Feed = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <BsStars />
      </div>
      <TweetBox />
      {tweets.map((tweet, index) => (
        <Post
          key={index}
          displayName={tweet.displayName}
          userName={`
          ${tweet.userName.slice(0, 6)}...
          ${tweet.userName.slice(-4)}
          `}
          avatar={tweet.avatar}
          text={tweet.text}
          isProfileImageNft={tweet.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))}
    </div>
  )
}

export default Feed
