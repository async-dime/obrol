import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client } from '../lib/client'

export const TwitterContext = createContext()

export const TwitterProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState('')
  const [currentAccount, setCurrentAccount] = useState('')
  const [tweets, setTweets] = useState([])
  const [currentUser, setCurrentUser] = useState({})

  const router = useRouter()

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      if (addressArray.length > 0) {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])

        createUserAccount(addressArray[0])
      } else {
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (err) {
      console.log(err)
      router.push('/')
      setAppStatus('error')
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      setAppStatus('loading')

      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (addressArray.length > 0) {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
      } else {
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (err) {
      console.log(err)
      setAppStatus('error')
    }
  }

  /**
   * Creates an account in Sanity DB if the user doesn't already have one
   * @param {string} userWalletAddress - the address of the account currently logged in
   */
  const createUserAccount = async (userWalletAddress = currentAccount) => {
    if (!window.ethereum) return setAppStatus('noMetaMask')

    try {
      // create userDoc
      const userDoc = {
        _type: 'users',
        _id: userWalletAddress,
        name: 'Unnamed',
        isProfileImageNft: false,
        profileImage:
          'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg',
        walletAddress: userWalletAddress,
      }
      // create userDoc if there's no user
      await client.createIfNotExists(userDoc)

      setAppStatus('connected')
    } catch (err) {
      console.log(err)
      router.push('/')
      setAppStatus('error')
    }
  }

  /**
   * Gets all the tweets stored in Sanity DB.
   */
  const fetchTweets = async () => {
    const query = `
      *[_type == "tweets"]{
        "author": author->{name, walletAddress, profileImage, isProfileImageNft},
        tweet,
        timestamp
      }|order(timestamp desc)
    `
    const sanityResponse = await client.fetch(query)

    setTweets([])

    sanityResponse.forEach(async (items) => {
      // profileImage

      const newItem = {
        tweet: items.tweet,
        timestamp: items.timestamp,
        author: {
          name: items.author.name,
          walletAddress: items.author.walletAddress,
          isProfileImageNft: items.author.isProfileImageNft,
          profileImage: items.author.profileImage,
        },
      }
      setTweets((prevState) => [...prevState, newItem])
    })
  }

  const getCurrentUserDetails = async (userAccount = currentAccount) => {
    if (appStatus !== 'connected') return

    const query = `
      *[_type == "users" && _id == "${userAccount}"]{
        "tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
        name,
        profileImage,
        isProfileImageNft,
        coverImage,
        walletAddress
      }
    `

    const sanityResponse = await client.fetch(query)

    setCurrentUser({
      tweets: sanityResponse[0].tweets,
      name: sanityResponse[0].name,
      profileImage: sanityResponse[0].profileImage,
      isProfileImageNft: sanityResponse[0].isProfileImageNft,
      coverImage: sanityResponse[0].coverImage,
      walletAddress: sanityResponse[0].walletAddress,
    })
  }

  return (
    <TwitterContext.Provider
      value={{
        appStatus,
        currentAccount,
        connectWallet,
        fetchTweets,
        tweets,
        currentUser,
        getCurrentUserDetails,
      }}
    >
      {children}
    </TwitterContext.Provider>
  )
}
