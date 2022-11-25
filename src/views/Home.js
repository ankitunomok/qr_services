import axios from "axios";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import "../App.css";
import { asyncWrap } from "../asyncWrap";
import qrcodeimage from "../images/qr.jpg";

function Qr(props) {
  // eslint-disable-next-line
  const { setQrCode, setIsScanning } = props;

  const previewStyle = {
    height: 500,
    width: 350,
    display: "flex",
    justifyContent: "center",
  };

  const camstyle = {
    display: "flex",
    justifyContent: "center",
  };

  const handleScan = (result) => {
    if (!result?.text) {
      return;
    }
    setQrCode(result?.text);
    setIsScanning(false);
  };

  return (
    <div style={camstyle}>
      <QrReader
        containerStyle={previewStyle}
        scanDelay={200}
        onResult={handleScan}
        constraints={{ facingMode: "environment" }}
      />
    </div>
  );
}

function Home() {
  const [isScanning, setIsScanning] = useState(false);
  const [qrcode, setQrCode] = useState("");
  const [mobile, setMobile] = useState("");

  const mobileValidation = /^[0]?[6789]\d{9}$/;

  const handleSubmit = async () => {
    if (qrcode.length === 0) {
      alert("Please scan atleast one qr code!");
      return;
    }
    if (!mobileValidation.test(mobile)) {
      alert("Please input a valid mobile number!");
      return;
    }

    const data = {
      countryCode: "IN",
      phone: `+91${mobile}`,
      pin: qrcode,
      networkId: "100",
      shortCode: "8790000000",
      source: "web",
    };

    const config = {
      method: "post",
      url: "/verify",
      data: data,
    };

    const [error, result] = await asyncWrap(axios(config));

    if (error) {
      console.log(error);
      return;
    }
    if (result.data.status === 200) {
      alert(result.data.message);
      setMobile("");
      setQrCode("");
      return;
    } else {
      alert(result.data.message);
      return;
    }
  };

  return (
    <div>
      {isScanning ? (
        <Qr setQrCode={setQrCode} setIsScanning={setIsScanning} />
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ alignSelf: "center" }}>
              Please complete the required details below:
            </p>
            <img
              style={{ width: "100px", alignSelf: "center" }}
              onClick={(e) => {
                e.preventDefault();
                setQrCode("");
                setIsScanning(true);
              }}
              src={qrcodeimage}
              alt="qr.jpg"
            />
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
              method="POST"
              action="#"
            >
              <input
                style={{
                  width: "90%",
                  alignSelf: "center",
                  padding: "10px",
                  marginTop: "10px",
                  maxWidth: "400px",
                }}
                type="text"
                value={qrcode}
                onChange={(e) => {
                  e.preventDefault();
                  setQrCode(e.target.value);
                }}
                placeholder="QR code"
              />
              <input
                style={{
                  width: "90%",
                  alignSelf: "center",
                  padding: "10px",
                  marginTop: "10px",
                  maxWidth: "400px",
                }}
                type="number"
                value={mobile}
                onChange={(e) => {
                  e.preventDefault();
                  setMobile(e.target.value);
                }}
                placeholder="Phone Number"
              />
              <input
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                style={{
                  padding: "10px 50px",
                  marginTop: "10px",
                  alignSelf: "center",
                }}
                type="submit"
              />
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
