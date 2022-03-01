import { useContext } from 'react'
import { TwitterContext } from '../context/TwitterContext'
import Image from 'next/image'
import Feed from '../components/home/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import errorImg from '../assets/error.svg'
import metamaskLogo from '../assets/metamask.svg'
import Loader from 'react-spinners/GridLoader'

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  loadingContainer: `w-full h-full flex flex-col justify-center items-center`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-24`,
}

const Home = () => {
  const { appStatus, connectWallet } = useContext(TwitterContext)

  const app = (status = appStatus) => {
    switch (status) {
      case 'connected':
        return userLoggedIn
      case 'notConnected':
        return noUserFound
      case 'noMetaMask':
        return noMetaMaskFound
      case 'error':
        return error
      default:
        return loading
    }
  }

  const userLoggedIn = (
    <div className={style.content}>
      <Sidebar initialSelectedIcon={'Home'} />
      <Feed />
      <Widgets />
    </div>
  )

  const noUserFound = (
    <div className={style.loginContainer}>
      <Image src={metamaskLogo} width={200} height={200} />
      <div
        className={style.walletConnectButton}
        onClick={() => connectWallet()}
      >
        Connect Wallet
      </div>
      <div className={style.loginContent}>Connect to Metamask.</div>
    </div>
  )

  const noMetaMaskFound = (
    <div className={style.loginContainer}>
      <Image src={metamaskLogo} width={200} height={200} />
      <div className={style.loginContent}>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://metamask.io/download.html`}
        >
          You must install MetaMask.
        </a>
      </div>
    </div>
  )

  const error = (
    <div className={style.loginContainer}>
      <Image src={errorImg} width={200} height={200} />
      <div className={style.loginContent}>
        An error occurred. Please try again.
      </div>
    </div>
  )

  const loading = (
    <div className={style.loadingContainer}>
      <Loader
        color="#808080"
        loading={true}
        size={50}
      />
    </div>
  )

  return <div className={style.wrapper}>{app(appStatus)}</div>
}

export default Home
