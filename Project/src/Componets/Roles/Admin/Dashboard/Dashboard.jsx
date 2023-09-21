import { useEffect, useState } from "react";
import { Card, Space, Statistic, Table, Typography } from "antd";
import instance from "../../../../axios";
import {
  DollarCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getOrders,getRevenue } from './Api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function Dashboard() {
  const [orders, setOrders] = useState(0);
  const[data,setdata]=useState([])
  const [revenue, setRevenue] = useState(100);
  useEffect(() => {
    instance.get('admin/dashboardview/').then((response)=>{
      const postdetails=response.data;
      setdata(postdetails)
      setRevenue(response.data.total_amount)

    }) .catch((error) => {
      console.error('Error fetching post data:', error);
    });
   
  }, []);
  

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
      <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Employee"}
          value={data.Employee}
        />
       
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Employeer"}
          value={data.Employeer}
        />
        <DashboardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Revenue"}
          value={revenue}
          
        />
      </Space>
      <Space>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </Space>
  );
}
function DashboardCard(props) {
  const { icon, title, value } = props;

  return (
    <Card>
      <Space direction='horizontal'>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    instance.get('admin/dashboardview/').then((response)=>{
      const { payments } = response.data;
      setDataSource(payments)
      setLoading(false);

    }) .catch((error) => {
      console.error('Error fetching post data:', error);
    });

   
  }, []);
  const columns = [
    {
      title: "Payment ID",
      dataIndex: "payment_id", // Use the correct dataIndex to match the data structure
    },
    {
      title: "Plan ID",
      dataIndex: "plan_id", // Use the correct dataIndex to match the data structure
    },
    {
      title: "Price",
      dataIndex: "amount", // Use the correct dataIndex to match the data structure
    },
  ];

  return (
    <>
      <Typography.Text>Recent Payment</Typography.Text>
      <Table
        columns={columns}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );

}

function DashboardChart() {
  const [loading, setLoading] = useState(false);
  const [reveneuData, setReveneuData] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    setLoading(true);
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };

      setReveneuData(dataSource);
    });
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };
  return(
    <Card style={{ width: 500, height: 250  } } >
    <Bar loading={loading} options={options} data={reveneuData}   />
   
  </Card >
  )
}
export default Dashboard
