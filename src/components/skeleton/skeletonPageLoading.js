import { ProTable } from "@ant-design/pro-components";
import { Skeleton, Space } from "antd";

const SkeletonPageLoading = () => {
  const skeletonCol = [
    {
      title: "",
      dataIndex: "",
      key: "",
      render: () => {
        return <Skeleton.Input className="!w-full" active size="small" />;
      },
    },
    // {
    //   title: "",
    //   dataIndex: "",
    //   key: "",
    //   render: () => {
    //     return <Skeleton.Input active size="small" />;
    //   },
    // },
    // {
    //   title: "",
    //   dataIndex: "",
    //   key: "",
    //   render: () => {
    //     return <Skeleton.Input active size="small" />;
    //   },
    // },
    // {
    //   title: "",
    //   dataIndex: "",
    //   key: "",
    //   render: () => {
    //     return <Skeleton.Input active size="small" />;
    //   },
    // },
    // {
    //   title: "",
    //   dataIndex: "",
    //   key: "",
    //   render: () => {
    //     return <Skeleton.Input active size="small" />;
    //   },
    // },
    // {
    //   title: "",
    //   dataIndex: "",
    //   key: "",
    //   render: () => {
    //     return <Skeleton.Input active size="small" />;
    //   },
    // },
  ];

  return (
    <Space className="!w-full" direction="vertical">
      <Space className="mt-[20px] gap-[10px]">
        <Skeleton.Input className="!w-[230px]" active size="default" />
        <Skeleton.Input className="!w-[300px]" active size="default" />
      </Space>
      <Space className="mt-[20px] gap-[10px]">
        <Skeleton.Input className="!w-[330px]" active size="default" />
        <Skeleton.Input className="!w-[230px]" active size="default" />
        <Skeleton.Button className="!w-[63px]" active size="default" />
        <Skeleton.Button className="!w-[63px]" active size="default" />
        <Skeleton.Button className="!w-[63px]" active size="default" />
        <Skeleton.Button className="!w-[63px]" active size="default" />
        <Skeleton.Button className="!w-[63px]" active size="default" />
        <Skeleton.Button className="!w-[63px]" active size="default" />
      </Space>
      <Space className="mt-[20px] mb-[60px] gap-[10px]">
        <Skeleton.Button className="!w-[60px]" active size="default" />
      </Space>
      <ProTable
        cardBordered
        search={false}
        columns={skeletonCol}
        size="small"
        dataSource={Array.from({ length: 10 }, (_, i) => i).map((item) => {
          return <Skeleton.Input active size="default" />;
        })}
      />
    </Space>
  );
};

export default SkeletonPageLoading;
