import React from 'react';
import { FacebookShareButton,TwitterShareButton, FacebookIcon , TwitterIcon} from 'react-share';

const SocialShare = () => {
  return (
    // the button is one with the ability to share, the icon is only a svg
    <div className="social-share">
      <FacebookShareButton url={`https://github.com/nygardk/react-share#readme`} title={`Test`}>
        <FacebookIcon round={true} size={24}>
        </FacebookIcon>
      </FacebookShareButton>

      <TwitterShareButton url={`https://github.com/nygardk/react-share#readme`}>
        <TwitterIcon round ={true} size={24}></TwitterIcon>
      </TwitterShareButton>
    </div>
  )
}

export default SocialShare;