import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button, Container, Form } from "react-bootstrap";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { endpoints } from "../../endpoints";

const InviteForm = () => {
  const [inviteData, setInviteData] = useState({
    receiverEmail: "",
    emailSubject: "",
    emailBody: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInviteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendInvite = async () => {
    try {
      const response = await axios.post(endpoints.sendEmail.newEmail, {
        receiverEmail: inviteData.receiverEmail,
        emailSubject: inviteData.emailSubject,
        emailBody: inviteData.emailBody,
      });

      // Clear form data
      setInviteData({
        receiverEmail: "",
        emailSubject: "",
        emailBody: "",
      });

      // Show success notification
      toast.success("Email sent successfully!");
    } catch (error) {
      // Show error notification
      toast.error("Error sending invite: " + error.message);
    }
  };

  return (
    <Container fluid>
      <Header />
      <Container className="mt-5 pt-5 mb-5 pb-5">
        <h2 className="mb-3 text-center">
          <strong>Email Invites</strong>
        </h2>
        <Form>
          <Form.Group controlId="receiverEmail" className="mt-5">
            <Form.Label>
              <strong>Receiver Email</strong>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter receiver's email"
              name="receiverEmail"
              value={inviteData.receiverEmail}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="emailSubject" className="mt-3">
            <Form.Label>
              <strong>Email Subject</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email subject"
              name="emailSubject"
              value={inviteData.emailSubject}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="emailBody" className="mt-3">
            <Form.Label>
              <strong>Email Body</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter email body"
              name="emailBody"
              value={inviteData.emailBody}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            style={{ float: "right" }}
            className="mt-3"
            variant="primary"
            onClick={handleSendInvite}
          >
            Send Invite
          </Button>
        </Form>
      </Container>
      <Footer />
      <ToastContainer />
    </Container>
  );
};

export default InviteForm;
