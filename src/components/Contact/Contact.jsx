import React, { useEffect, useState } from "react";
import "./Contact.css";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";

const Contact = () => {
  // State to store contact details
  const [contactInfo, setContactInfo] = useState({
    phone: "9876543210", // Dummy data, replace with API response
    chat: "9876543211",
    videoCall: "9876543212",
    message: "9876543213",
  });

  /* Example: Fetch contact details from Spring Boot backend
  useEffect(() => {
    fetch("http://localhost:8080/api/contact") // Replace with actual endpoint
      .then((response) => response.json())
      .then((data) => setContactInfo(data))
      .catch((error) => console.error("Error fetching contact info:", error));
  }, []);
  */

  return (
    <div id="contact-us" className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        {/* Left side */}
        <div className="flexColStart c-left">
          <span className="orangeText">Our Contact Us</span>
          <span className="primaryText">Easy to contact us</span>
          <span className="secondaryText">
            We are always ready to help by providing the best services for you.
            We believe a good place to live can make your life better.
          </span>

          <div className="flexColStart contactModes">
            {/* First row */}
            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <MdCall size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Call</span>
                    <span className="secondaryText">{contactInfo.phone}</span>
                  </div>
                </div>
                <div className="flexCenter button">Call now</div>
              </div>

              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Chat</span>
                    <span className="secondaryText">{contactInfo.chat}</span>
                  </div>
                </div>
                <div className="flexCenter button">Chat now</div>
              </div>
            </div>

            {/* Second row */}
            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Video Call</span>
                    <span className="secondaryText">
                      {contactInfo.videoCall}
                    </span>
                  </div>
                </div>
                <div className="flexCenter button">Video Call now</div>
              </div>

              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <HiChatBubbleBottomCenter size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Message</span>
                    <span className="secondaryText">{contactInfo.message}</span>
                  </div>
                </div>
                <div className="flexCenter button">Message now</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flexEnd c-right">
          <div className="image-container">
            <img src="./contact.jpg" alt="Contact Us" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
