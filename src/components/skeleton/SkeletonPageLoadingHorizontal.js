import { ProTable } from "@ant-design/pro-components";
import { Col, Row, Skeleton, Space } from "antd";

const SkeletonPageLoadingHorizontal = ({ absolute }) => {
  const skeletonCol = [
    {
      title: "",
      dataIndex: "",
      key: "",
      render: () => {
        return <Skeleton.Input className="!w-full" active size="small" />;
      },
    },
  ];

  return (
    <section
      className={`flex flex-col sm:flex-row gap-x-[10px] ${
        absolute && "absolute-center w-full h-full bg-white z-[100]"
      }`}
    >
      <Space className="min-w-[300px]" direction="vertical">
        <Skeleton.Input active size="small" />
        <Space direction="vertical" className="mt-[10px] gap-[0px]">
          <Skeleton.Input className="!w-[300px]" active size="default" />
          <Skeleton.Input className="!w-[300px]" active size="default" />
        </Space>

        <Space className="w-full" direction="vertical">
          <Row className="w-full my-[0px]" gutter={[8, 0]}>
            <Col span={8}>
              <Skeleton.Button className="!w-full" active size="default" />
            </Col>
            <Col span={8}>
              <Skeleton.Button className="!w-full" active size="default" />
            </Col>
            <Col span={8}>
              <Skeleton.Button className="!w-full" active size="default" />
            </Col>
          </Row>
        </Space>
        <Space className="w-full" direction="vertical">
          <Row className="w-full my-[0px]" gutter={[8, 0]}>
            <Col span={8}>
              <Skeleton.Button className="!w-full" active size="default" />
            </Col>
            <Col span={8}>
              <Skeleton.Button className="!w-full" active size="default" />
            </Col>
            <Col span={8}>
              <Skeleton.Button className="!w-full" active size="default" />
            </Col>
          </Row>
        </Space>
        <Space className="w-full mt-[10px]" direction="vertical">
          {Array.from({ length: 8 }, (_, i) => i).map((item) => {
            return (
              <Row className="w-full my-[0px]">
                <Col span={8}>
                  <Skeleton.Button active size="default" />
                </Col>
                <Col span={16}>
                  <Skeleton.Input className="!w-full" active size="default" />
                </Col>
              </Row>
            );
          })}
          <Skeleton.Button
            className="!w-[100px] mt-[10px]"
            active
            size="default"
          />
        </Space>
      </Space>
      <section className="w-full">
        <Skeleton.Button
          className="!w-[100px] mb-[10px] hidden sm:block"
          active
          size="default"
        />
        <ProTable
          className="w-full"
          cardBordered
          search={false}
          columns={skeletonCol}
          size="small"
          dataSource={Array.from({ length: 10 }, (_, i) => i).map((item) => {
            return <Skeleton.Input active size="default" />;
          })}
        />
      </section>
    </section>
  );
};

export default SkeletonPageLoadingHorizontal;
