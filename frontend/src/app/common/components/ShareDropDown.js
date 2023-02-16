import React from "react";
import SVG from "react-inlinesvg/esm";
import {copyToClipBoard} from "app/common/util/Helpers";
import toastMessage from "app/common/util/toastMessage";

const ShareDropDown = ({ url = window.location.href, title = "Openfolio" }) => {

    const copyLink = url => {
        copyToClipBoard(url)
        toastMessage("info", "Copied to Clipboard");
    }

    const socials = [{
                            name: "Twitter",
                            svg: "twitter",
                            link: `https://twitter.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`

                        },
                        {
                            name: "Facebook",
                            svg: "facebook",
                            link: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}&display=popup`

                        },
                        {
                            name: "Linkedin",
                            svg: "linkedin",
                            link: `https://www.linkedin.com/shareArticle/?url=${encodeURIComponent(url)}`

                        },
                        {
                            name: "Copy link",
                            svg: "link"

                        }];

    return <div className="py-1.5 text-black-1 dark:text-white rounded-lg text-sm dark:bg-dark dark:border-dark-1 dark:border">
        {
            socials.map((social, i) => <a
                                            className="initial block py-3 pl-3 w-full cursor-pointer hover:bg-secondary-light dark:hover:bg-dark-1"
                                            key={`social-${i}`}
                                            href={social.link ?? null}
                                            onClick={social.link ? null : _ => copyLink(url)}
                                            target={social.link ? "_blank" : "_self"}
                                            rel="noreferrer"
                                        >
                                            <SVG
                                                src={`/assets/media/svg/${social.svg}.svg`}
                                                className="inline-block stroke-current mr-2"
                                            />
                                            {social.name}
                                        </a>)
        }
    </div>
}

export default ShareDropDown;