import { useState, useEffect } from 'react'

import Image from 'next/image'

// Components
import Account from './Account'
import Add from './Add'

// Images
import up from '../assets/up.svg'
import down from '../assets/down.svg'
import add from '../assets/add.svg'

const Overview = ({ account, setAccount, markets, trackedTokens, setTrackedTokens, tokens }) => {
	const [value, setValue] = useState(0)

	const [isAccountModalOpen, setIsAccountModalOpen] = useState(false)
	const [isAddTokenModalOpen, setIsAddTokenModalOpen] = useState(false)

	const accountModalHandler = () => {
		setIsAccountModalOpen(true)
	}

		const tokenModalHandler = () => {
			if (account) {
				setIsAddTokenModalOpen(true)
			} else {
				setIsAccountModalOpen(true)
			}
		}

	  const calculateValue = () => {
    	const total = tokens.reduce((acc, token) => {
      	return token.balance === 0 ? acc : acc + token.value
    }, 0)

    setValue(total)
  }

		useEffect(() => {
			if (tokens.length === 0) {
				setValue(0)
			} else {
				calculateValue()
			}
		})

	return (
		<div className="overview">
			<div className="overview__account">
				<h3>Account</h3>
				{ account ?(
					<p>{account.slice(0,6) + "..." + account.slice(-4)}</p>
				) : (
					<button onClick={accountModalHandler}>
						<Image 
							src={add}
							width={20}
							height={20}
							alt="Set account"
						/> 
					</button>
				)}

			</div>

			<div className="overview__tracked">
				<h3>Assets Tracked</h3>
				<p>{trackedTokens.length}</p>
				<button onClick={tokenModalHandler} >
					<Image 
						src={add}
						width={20}
						height={20}
						alt="Add token"
					/>
				</button>
			</div>

			<div className="overview__total">
				<h3>Total Value</h3>
				<p>{value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
			</div>

			<div className="overview__change">
				<h3>% Change</h3>
				<p>
					<Image
						src={up}
						width={20}
						height={20}
						alt="Change direction"
					/>
					<span className="green">0.00%</span>
				</p>
			</div>

			{isAccountModalOpen &&
				<Account
					setIsAccountModalOpen={setIsAccountModalOpen}
					setAccount={setAccount}
				/>
			}

			{isAddTokenModalOpen &&
				<Add
					setIsAddTokenModalOpen={setIsAddTokenModalOpen}
					markets={markets}
					trackedTokens={trackedTokens}
					setTrackedTokens={setTrackedTokens}
				/>
			}

		</div>
	);
}

export default Overview;
