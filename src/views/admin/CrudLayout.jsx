import { useState } from "react";
import { useAuth } from "../../context/AuthContext";


const footerNavigation = [
  {
    name: "Log out",
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:fill-[#4F80E1] fill-[#637381]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.75 3C3.55109 3 3.36032 3.07902 3.21967 3.21967C3.07902 3.36032 3 3.55109 3 3.75V14.25C3 14.4489 3.07902 14.6397 3.21967 14.7803C3.36032 14.921 3.55109 15 3.75 15H6.75C7.16421 15 7.5 15.3358 7.5 15.75C7.5 16.1642 7.16421 16.5 6.75 16.5H3.75C3.15326 16.5 2.58097 16.2629 2.15901 15.841C1.73705 15.419 1.5 14.8467 1.5 14.25V3.75C1.5 3.15326 1.73705 2.58097 2.15901 2.15901C2.58097 1.73705 3.15326 1.5 3.75 1.5H6.75C7.16421 1.5 7.5 1.83579 7.5 2.25C7.5 2.66421 7.16421 3 6.75 3H3.75Z"
        />
        <path
          d="M12 12.75L15.75 9L12 5.25"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 9C6 8.58579 6.33579 8.25 6.75 8.25H15.75C16.1642 8.25 16.5 8.58579 16.5 9C16.5 9.41421 16.1642 9.75 15.75 9.75H6.75C6.33579 9.75 6 9.41421 6 9Z"
        />
      </svg>
    ),
  },
];

const CrudLayout = ({child}) => {
  const {state} = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [openSideBar, setOpenSieBar] = useState(true);
  const changeSideBar = () => {
    setOpenSieBar(!openSideBar);
  };
  const showMenuItems = () => {
    setShowMenu(!showMenu);
  };
  const navigationList = [
    {
      name: "Inicio",
      svg: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:fill-[#4F80E1] fill-[#637381]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.53955 0.907986C8.81038 0.697338 9.18962 0.697338 9.46045 0.907986L16.2105 6.15799C16.3931 6.30008 16.5 6.51856 16.5 6.75V15C16.5 15.5967 16.2629 16.169 15.841 16.591C15.419 17.0129 14.8467 17.25 14.25 17.25H3.75C3.15326 17.25 2.58097 17.0129 2.15901 16.591C1.73705 16.169 1.5 15.5967 1.5 15V6.75C1.5 6.51856 1.60685 6.30008 1.78954 6.15799L8.53955 0.907986ZM3 7.11681V15C3 15.1989 3.07902 15.3897 3.21967 15.5303C3.36032 15.671 3.55109 15.75 3.75 15.75H14.25C14.4489 15.75 14.6397 15.671 14.7803 15.5303C14.921 15.3897 15 15.1989 15 15V7.11681L9 2.45015L3 7.11681Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 9C6 8.58579 6.33579 8.25 6.75 8.25H11.25C11.6642 8.25 12 8.58579 12 9V16.5C12 16.9142 11.6642 17.25 11.25 17.25C10.8358 17.25 10.5 16.9142 10.5 16.5V9.75H7.5V16.5C7.5 16.9142 7.16421 17.25 6.75 17.25C6.33579 17.25 6 16.9142 6 16.5V9Z"
          />
        </svg>
      ),
    },
    {
      name: "Dashboard",
      svg: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:fill-[#4F80E1] fill-[#637381]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.5 2.25C1.5 1.83579 1.83579 1.5 2.25 1.5H7.5C7.91421 1.5 8.25 1.83579 8.25 2.25V7.5C8.25 7.91421 7.91421 8.25 7.5 8.25H2.25C1.83579 8.25 1.5 7.91421 1.5 7.5V2.25ZM3 3V6.75H6.75V3H3Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.75 2.25C9.75 1.83579 10.0858 1.5 10.5 1.5H15.75C16.1642 1.5 16.5 1.83579 16.5 2.25V7.5C16.5 7.91421 16.1642 8.25 15.75 8.25H10.5C10.0858 8.25 9.75 7.91421 9.75 7.5V2.25ZM11.25 3V6.75H15V3H11.25Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.75 10.5C9.75 10.0858 10.0858 9.75 10.5 9.75H15.75C16.1642 9.75 16.5 10.0858 16.5 10.5V15.75C16.5 16.1642 16.1642 16.5 15.75 16.5H10.5C10.0858 16.5 9.75 16.1642 9.75 15.75V10.5ZM11.25 11.25V15H15V11.25H11.25Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.5 10.5C1.5 10.0858 1.83579 9.75 2.25 9.75H7.5C7.91421 9.75 8.25 10.0858 8.25 10.5V15.75C8.25 16.1642 7.91421 16.5 7.5 16.5H2.25C1.83579 16.5 1.5 16.1642 1.5 15.75V10.5ZM3 11.25V15H6.75V11.25H3Z"
          />
        </svg>
      ),
    },
    {
      name: "Gestion de Productos",
      svg: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:fill-[#4F80E1] fill-[#637381]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.87661 1.05204C8.21826 0.855165 8.60566 0.751526 9 0.751526C9.39435 0.751526 9.78177 0.855173 10.1234 1.05207C10.124 1.05237 10.1245 1.05267 10.125 1.05297L15.375 4.05296C15.7167 4.25025 16.0005 4.53392 16.198 4.87553C16.3954 5.21713 16.4996 5.60465 16.5 5.99922V12.0008C16.4996 12.3953 16.3954 12.7828 16.198 13.1244C16.0005 13.4661 15.7167 13.7497 15.375 13.947L15.3721 13.9487L10.125 16.947C10.1245 16.9473 10.1241 16.9475 10.1237 16.9478C9.78194 17.1448 9.39444 17.2485 9 17.2485C8.60558 17.2485 8.21809 17.1448 7.87639 16.9478C7.87593 16.9475 7.87546 16.9473 7.875 16.947L2.6279 13.9487L2.625 13.947C2.2833 13.7497 1.99948 13.4661 1.80202 13.1244C1.60456 12.7828 1.5004 12.3953 1.5 12.0008V5.99922C1.5004 5.60465 1.60456 5.21713 1.80202 4.87553C1.99948 4.53392 2.2833 4.25025 2.625 4.05297L2.62789 4.0513L7.87661 1.05204ZM9 2.25153C8.86835 2.25153 8.73901 2.28618 8.625 2.35201L8.62211 2.35368L3.375 5.35201C3.37461 5.35223 3.37421 5.35246 3.37382 5.35269C3.26044 5.41842 3.16626 5.51272 3.10067 5.62619C3.03491 5.73997 3.00019 5.86902 3 6.00043V11.9995C3.00019 12.131 3.03491 12.26 3.10067 12.3738C3.16626 12.4873 3.26044 12.5816 3.37382 12.6473C3.37421 12.6475 3.37461 12.6477 3.375 12.648L8.625 15.648C8.73901 15.7138 8.86835 15.7485 9 15.7485C9.13165 15.7485 9.26098 15.7138 9.375 15.648L9.3779 15.6463L14.625 12.648C14.6254 12.6477 14.6258 12.6475 14.6262 12.6473C14.7396 12.5816 14.8337 12.4873 14.8993 12.3738C14.9651 12.2599 14.9999 12.1307 15 11.9992V6.00076C14.9999 5.86923 14.9651 5.74006 14.8993 5.62619C14.8337 5.51272 14.7396 5.41843 14.6262 5.3527C14.6258 5.35247 14.6254 5.35224 14.625 5.35201L9.375 2.35201C9.26098 2.28619 9.13165 2.25153 9 2.25153Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.80331 4.84446C2.01072 4.48591 2.46951 4.36339 2.82806 4.5708L9.00002 8.14106L15.172 4.5708C15.5305 4.36339 15.9893 4.48591 16.1967 4.84446C16.4041 5.20301 16.2816 5.6618 15.9231 5.86921L9.37556 9.65671C9.14323 9.7911 8.8568 9.7911 8.62447 9.65671L2.07697 5.86921C1.71843 5.6618 1.59591 5.20301 1.80331 4.84446Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 8.25C9.41421 8.25 9.75 8.58579 9.75 9V16.56C9.75 16.9742 9.41421 17.31 9 17.31C8.58579 17.31 8.25 16.9742 8.25 16.56V9C8.25 8.58579 8.58579 8.25 9 8.25Z"
          />
        </svg>
      ),
    },
    {
      name: "Mis ventas",
      svg: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:fill-[#4F80E1] fill-[#637381]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.56 0.309091C3.71108 0.114514 3.94819 0 4.2 0H13.8C14.0518 0 14.2889 0.114514 14.44 0.309091L16.84 3.4C16.9439 3.53376 17 3.69644 17 3.86364V14.6818C17 15.2966 16.7471 15.8863 16.2971 16.321C15.847 16.7558 15.2365 17 14.6 17H3.4C2.76348 17 2.15303 16.7558 1.70294 16.321C1.25286 15.8863 1 15.2966 1 14.6818V3.86364C1 3.69644 1.05614 3.53376 1.16 3.4L3.56 0.309091ZM4.6 1.54545L2.6 4.12121V14.6818C2.6 14.8868 2.68429 15.0833 2.83431 15.2282C2.98434 15.3731 3.18783 15.4545 3.4 15.4545H14.6C14.8122 15.4545 15.0157 15.3731 15.1657 15.2282C15.3157 15.0833 15.4 14.8868 15.4 14.6818V4.12121L13.4 1.54545H4.6Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 6.75C6.41421 6.75 6.75 7.08579 6.75 7.5C6.75 8.09674 6.98705 8.66903 7.40901 9.09099C7.83097 9.51295 8.40326 9.75 9 9.75C9.59674 9.75 10.169 9.51295 10.591 9.09099C11.0129 8.66903 11.25 8.09674 11.25 7.5C11.25 7.08579 11.5858 6.75 12 6.75C12.4142 6.75 12.75 7.08579 12.75 7.5C12.75 8.49456 12.3549 9.44839 11.6517 10.1517C10.9484 10.8549 9.99456 11.25 9 11.25C8.00544 11.25 7.05161 10.8549 6.34835 10.1517C5.64509 9.44839 5.25 8.49456 5.25 7.5C5.25 7.08579 5.58579 6.75 6 6.75Z"
          />
        </svg>
      ),
    },
    state.rol === 'admin' &&
    {
      name: "Creacion de Usuarios"
    } 
  ];
  return (
    <div className="min-h-[100vh] bg-[#F6F8FA] w-full nourd-text admin-dashboard">
      <div
        className={`w-full flex ${
          showMenu ? "overflow-hidden h-screen" : "sm:overflow-auto"
        }`}
      >
        <div
          className={`transition-all duration-1000 ease-in-out z-50 bg-white sm:relative sm:flex sm:flex-col gap-2 sm:gap-16 rounded-br-xl h-screen min-h-[600px] py-6 absolute top-0 sm:left-0 ${
            showMenu
              ? "left-0 h-screen overflow-y-auto px-5"
              : "-left-72 sm:left-0"
          } ${openSideBar ? "w-72 px-5" : "w-72 sm:w-24"} overflow-hidden`}
        >
          <div
            className={`transition-all duration-500 delay-700 ease-in-out flex gap-2 justify-start items-center ${
              openSideBar ? "sm:justify-start" : "sm:justify-center"
            }  cursor-pointer relative z-30`}
          >
            <img
              src={"https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png?20170812110931"}
              className="z-30 w-[70px] h-[70px]"
              alt="logo"
            />
            <span
              className={`text-xl font-semibold ${
                openSideBar ? " block" : "block sm:hidden"
              } `}
            >
              {state.nameUser}
            </span>
            <img
              src={"/assets/admin/dashboard/close.svg"}
              alt="close"
              className={`h-7 cursor-pointer sm:hidden left-5 relative ${
                showMenu ? "block " : "hidden"
              }`}
              onClick={showMenuItems}
            />
            <div
              className={`h-10  w-10 rounded-full bg-white absolute top-0  sm:flex justify-center items-center cursor-pointer hidden ${
                openSideBar ? "rotate-[180deg] -right-3" : "rotate-0 -right-3"
              }`}
              onClick={changeSideBar}
            >
              <svg
                className="w-8 h-8 rotate-[180deg]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 sm:justify-between h-full mt-10 sm:mt-0">
            <div className="md:max-w-[234px]">
              {navigationList?.map((data, index) => (
                <div
                  key={index}
                  className={`flex gap-2.5 items-center cursor-pointer py-2 group hover:bg-[#4F80E1]/[12%] group rounded-md overflow-hidden ${
                    openSideBar
                      ? " pl-5 justify-start flex-row"
                      : "pl-5 sm:pl-0 justify-start sm:justify-center sm:flex-col"
                  } `}
                >
                  <div>{data?.svg}</div>
                  <span
                    className={`font-medium text-base group-hover:text-[#4F80E1] text-[#637381]  
                     ${
                       openSideBar
                         ? " block"
                         : "block sm:hidden group-hover:block sm:group-hover:text-xs"
                     }`}
                  >
                    {data?.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-5">
              <div className="max-w-[234px]">
                {footerNavigation?.map((data, index) => (
                  <div
                    className={`flex gap-2.5 items-center cursor-pointer py-2 rounded-md hover:bg-[#4F80E1]/[12%] group ${
                      openSideBar
                        ? " pl-5 justify-start flex-row"
                        : "pl-5 sm:pl-0 justify-start sm:justify-center sm:flex-col"
                    }`}
                    key={index}
                  >
                    {data?.svg}
                    <span
                      className={`font-medium text-base group-hover:text-[#4F80E1] text-[#637381] ${
                        openSideBar
                          ? " block"
                          : "block sm:hidden group-hover:block sm:group-hover:text-xs"
                      }`}
                    >
                      {data?.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="pt-5 pl-8 pr-7 py-5 bg-white flex justify-between gap-2 ">
            <div className="hidden sm:flex max-w-2xl justify-between w-full">
              <div className="flex flex-col">
                <span className="text-base md:text-2xl text-[#212B36] font-bold">
                  Hola! {state.nameUser}
                </span>
                <span className="text-sm font-normal">
                  Bienvenido al apartado de productos de tus productos
                </span>
              </div>
            </div>
            <div className="flex gap-2 items-center sm:hidden">
            <img
              src={"https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png?20170812110931"}
              className="z-30 w-[70px] h-[70px]"
              alt="logo"
            />
              <span className="text-xl font-semibold ">Mecanico Express</span>
            </div>
            <div
              className="cursor-pointer sm:hidden border border-[#E7E7E7] hover:border-blue-600 group rounded-md flex justify-center items-center"
              onClick={showMenuItems}
            >
              <svg
                className="group-hover:text-blue-600 text-[#637381] w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
          </div>
          <div className="w-full py-3 pl-10 pr-16 gap-5 justify-center">
            {child}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CrudLayout;