import { Box, Typography } from '@mui/material';
import React from 'react';
import {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
} from '../../../redux/rtk/productsApi';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PieChart, Pie, Sector, Cell } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const style = {
  display: 'flex',
  flexDirection: 'column',
  width: '800px',
  height: '100%',
  backgroundColur: 'yellow',
};
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export const Statisticks = () => {
  const { data: TVs } = useGetProductsByCategoryQuery('TV');
  const { data: Mobiles } = useGetProductsByCategoryQuery('Mobile');
  const { data: Laptops } = useGetProductsByCategoryQuery('Laptop');
  console.log('tv', TVs);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '800px',
        height: '100%',
        backgroundColur: 'yellow',
      }}
    >
      <Typography>Statistics</Typography>
      {/* <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={TVs}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="model" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer> */}
      {Mobiles && (
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={Mobiles}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={200}
              fill="#8884d8"
              dataKey="stock"
              label={renderCustomizedLabel}
            >
              {Mobiles.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};
