import { Button } from "antd";
import { useRef } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";

const HtmlCanvasWrapper = ({ imageName, children }) => {
  const canvasRef = useRef(null);
  const handleDownload = () => {
    html2canvas(canvasRef.current).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${imageName}.png`;
      link.href = dataUrl;
      link.click();
    });
  };
  return (
    <>
      <section className="flex items-center justify-end my-[20px]">
        <Button
          type="primary"
          className="ml-[10px]"
          icon={<DownloadOutlined />}
          size="small"
          shape="round"
          onClick={() => {
            handleDownload();
          }}
        ></Button>
      </section>
      <section ref={canvasRef}>{children}</section>
    </>
  );
};

export default HtmlCanvasWrapper;
