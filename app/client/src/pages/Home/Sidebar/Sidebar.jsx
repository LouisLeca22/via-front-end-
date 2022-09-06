import { useDispatch, useSelector } from 'react-redux';
import "./Sidebar.scss";
import { logout } from '../../../features/auth/authSlice';
import { FaUser, FaPlus, FaStar, FaFilter, FaLeaf, FaFootballBall, FaHandsHelping, FaTools } from "react-icons/fa"
import { GiCook, GiPalette, } from "react-icons/gi"
import { BsGrid3X3GapFill, BsFillChatLeftDotsFill } from "react-icons/bs"
import { RiLogoutBoxRFill } from "react-icons/ri"
import { activePanel, activeFilter, handleShowFilter, handleShowSidebar } from '../../../features/global/globalSlice';
import { MdAdminPanelSettings } from "react-icons/md"

const Sidebar = () => {

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { showSidebar, panel, showFilter, filter } = useSelector(state => state.global)
  const handlePanel = (panel) => {
    dispatch(handleShowSidebar())
    dispatch(activePanel(panel))
  }

  const handleFIlter = (filter) => {
    dispatch(handleShowFilter())
    dispatch(activeFilter(filter))
  }

  return (
    <div className={showSidebar ? "sidebar show" : showFilter ? "sidebar sideFilter" : "sidebar"}>
      <ul className='main'>
        <div>
          <li onClick={() => handlePanel('profile')}>
            <FaUser className={panel === "profile" ? "icon active" : "icon"} />
          </li>
          <li className='chat-icon' onClick={() => handlePanel('chat')}>
            <BsFillChatLeftDotsFill className={panel === "chat" ? "icon active" : "icon"} />
          </li>
          <li onClick={() => handlePanel('add')}>
            <FaPlus className={panel === "add" ? "icon active" : "icon"} />
          </li>
          <li onClick={() => handlePanel("bookmark")}><FaStar className={panel === "bookmark" ? "icon active" : "icon"} /></li>
        </div>
        <div>
          <li onClick={() => {

            dispatch(handleShowFilter())
          }}><FaFilter className={"icon"} />
          </li>
        </div>
        {showFilter && (
          <ul className='filter'>
            <li className="filterLi" onClick={() => handleFIlter("")}>
              <BsGrid3X3GapFill title="Tous" className={filter === "" ? "icon filterIcon active" : "icon filterIcon"} />
            </li>
            <li className="filterLi" title="Bénévolat" onClick={() => handleFIlter("Bénévolat")}>
              <FaHandsHelping className={filter === "Bénévolat" ? "icon filterIcon active" : "icon filterIcon"} />
            </li>
            <li className="filterLi" title="Arts" onClick={() => handleFIlter("Arts")}>
              <GiPalette className={filter === "Arts" ? "icon filterIcon active" : "icon filterIcon"} />
            </li>
            <li className="filterLi" title="Cusine" onClick={() => handleFIlter("Cuisine")}>
              <GiCook className={filter === "Cuisine" ? "icon active filterIcon" : "icon filterIcon"} />
            </li>
            <li className="filterLi" title="Jardinage" onClick={() => handleFIlter("Jardinage")}>
              <FaLeaf className={filter === "Jardinage" ? "icon active filterIcon" : "icon filterIcon"} />
            </li>
            <li className="filterLi" title="Bricolage" onClick={() => handleFIlter("Bricolage")}>
              <FaTools className={filter === "Bricolage" ? "icon active filterIcon" : "icon filterIcon"} />
            </li>
            <li className="filterLi" title="Danse" onClick={() => handleFIlter("Danse")}>
              <FaFootballBall className={filter === "Danse" ? "icon active filterIcon" : "icon filterIcon"} />
            </li>
          </ul>
        )}
      </ul>
      <ul className='bottom'>
        {user && user.is_admin && (
          <li className='button-dash' onClick={() => handlePanel('dashboard')}>
            <MdAdminPanelSettings className={panel === "dashboard" ? "icon active" : "icon"} />
          </li>
        )}
        <li onClick={() => dispatch(logout())}>
          <RiLogoutBoxRFill className="icon" />
        </li>
      </ul>
    </div>
  )
}

export default Sidebar