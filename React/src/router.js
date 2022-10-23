class Router extends React.Component {

    constructor(props) {
        super(props);
    }
  
    // if(!token) {
    //   return <Login setToken={setToken} />
    // }
  
    render() {
        return (
      <div className="wrapper">
      <BrowserRouter>
      <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/preferences" element={<Preferences />} />
      </Routes>
      </BrowserRouter>
    </div>
    )
  }
}
  