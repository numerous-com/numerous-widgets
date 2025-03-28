import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
  PieController,
  DoughnutController,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register Chart.js components and controllers
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
  PieController,
  DoughnutController
);

// Set global font defaults
ChartJS.defaults.font.family = '"Nunito Sans", sans-serif';
ChartJS.defaults.font.size = 12; 