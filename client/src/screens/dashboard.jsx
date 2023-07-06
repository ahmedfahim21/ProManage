import DashboardPanel from "../components/DashboardPanel"
import Header from "../components/Header"
import Analytics from "../components/Analytics"

function dashboard() {
  return (
    <div>
      <Header/>
      <DashboardPanel/>
      <Analytics/>
      </div>
  )
}

export default dashboard