import Login from './components/Login';

export default () => {
  const styles = {
    main: {
      width:'100%',
      height:'100%',
    }
  }
  return (
    <div style={styles.main}>
      <Login />
    </div>
  )
  
}