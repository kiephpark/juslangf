import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


export default function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright @ '}
        <Link color="inherit" href="#">
          주슐랭의 그래서 싸냐고
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }