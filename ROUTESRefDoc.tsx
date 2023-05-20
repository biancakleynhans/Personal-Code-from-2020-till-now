import React, { useEffect } from 'react';
import { BrowserRouter, Link, Navigate, NavLink, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';

interface iRoute {
  name: string;
  path: string;
}

interface iRouteFull extends iRoute {
  element: JSX.Element;
  showOnMenu: boolean;
}

// const routesFull: iRouteFull[] = [
//   {
//     path: '/',
//     name: 'Home',
//     element: (
//       <LayoutStandard>
//         <LeaveLanding />
//       </LayoutStandard>
//     ),
//     showOnMenu: false,
//   },
//   {
//     path: '/auth',
//     name: 'Auth',
//     element: (
//       <LayoutAuth>
//         <div className={TEXT_NORMAL}>AUTH SCREEN</div>
//       </LayoutAuth>
//     ),
//     showOnMenu: true,
//   },

//   {
//     path: '/leave-section',
//     name: 'Leave Per Section',
//     element: (
//       <LayoutStandard>
//         <LeaveSection />
//       </LayoutStandard>
//     ),
//     showOnMenu: true,
//   },
//   {
//     path: '/leave-absent',
//     name: 'Absent Leave Update',
//     element: (
//       <LayoutStandard>
//         <LeaveAbsentUpdate />
//       </LayoutStandard>
//     ),
//     showOnMenu: true,
//   },
//   {
//     path: '/admin',
//     element: (
//       <LayoutStandard>
//         <Admin />
//       </LayoutStandard>
//     ),
//     name: 'admin pannel',
//     showOnMenu: true,
//   },
//   {
//     path: '/admin-leave',
//     name: 'Leave File Upload',
//     element: (
//       <LayoutStandard>
//         <LeaveAdmin />
//       </LayoutStandard>
//     ),
//     showOnMenu: true,
//   },
//   {
//     path: '/info',
//     element: (
//       <LayoutStandard>
//         <InfoPage />
//       </LayoutStandard>
//     ),
//     name: 'Help me page',
//     showOnMenu: true,
//   },
//   {
//     path: '/user/:userId',
//     element: (
//       <LayoutStandard>
//         <UserPage />
//       </LayoutStandard>
//     ),
//     name: 'Single user page',
//     showOnMenu: false,
//   },
// ];

// export const RouteDisplayList: iRoute[] = [];
// routesFull.map((x) => x.showOnMenu && RouteDisplayList.push({ name: x.name, path: x.path }));

/* <Routes>
        {routesFull.map((x, i) => (
          <Route key={i} path={x.path} element={x.element} loader={() => <LoadingComponent color='teal' type='MutatingDots' text='Loading ...' />} errorElement={<ErrorPage />} />
        ))}
    </Routes> 
*/

//     errorElement: <ErrorPage />,
//     loader: () => <LoadingComponent color='teal' type='MutatingDots' text='Loading ...' />,

function MainRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />

          {/* Protecting routes  */}
          <Route element={<ProtectedRoute />}>
            <Route path='/books/*' element={<BookRoutes />} />
            <Route path='/dash' element={<Dash />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>

        {/* side bar  implementation or extra content if you want it to work on multiple paths add location to the Routes tag  */}
        <Routes location='/books'>
          <Route path='/books' element={<h2>This is extra content beign displayed from a diffrent routes - route </h2>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

// grouping routes togther
function BookRoutes() {
  return (
    <Routes>
      {/* if you need multiple routes to use the same layout remove path from the parent component  */}
      <Route element={<BooksLayout />}>
        <Route index element={<Books />} />
        <Route path=':id' element={<Book />} />
        <Route path='new' element={<NewBook />} />
      </Route>
    </Routes>
  );
}

function BooksLayout() {
  const [searchParams, setsearchParams] = useSearchParams({ n: '0' });
  const bookNum = searchParams.get('n');

  useEffect(() => {
    console.log('Search Params ', searchParams.get('n'));
  }, [searchParams]);

  return (
    <div>
      {/*
          Link props:  
            replace = replaces the prev route with this when clicked and navigated to
            reloadDocument = reloads the page when redirecting to it 
            state = 

            Navlink: 
              end =  only matches active on complete path
         */}
      <Link to='/books'>Book List</Link> / <Link to='/books/1'>Book 1</Link> / <Link to='/books/2'>Book 2</Link> / <Link to='/books/new'>New Book </Link>
      <br />
      <Link to='/auth'>Auth</Link>
      <br />
      <Link to='/' state='HI HOME'>
        {/* state passes info to the page we are navigating to it travels with the page route */}
        Home with state
      </Link>
      <br />
      <Link to={`/books/${bookNum}`}>Book {bookNum}</Link>
      <br />
      <NavLink to='/books' className='' style={(props: { isActive: boolean; isPending: boolean }) => (props.isActive ? { color: 'red' } : { color: 'black' })}>
        {(props: { isActive: boolean; isPending: boolean }) => (props.isActive ? 'HOME ACTIVE' : ' Home')}
      </NavLink>
      <br />
      <input type='number' name='' id='' value={bookNum ? Number(bookNum) : 0} onChange={(e) => setsearchParams({ n: e.target.value })} />
      <Outlet context={{ key: 'value' }} />
    </div>
  );
}

function Books() {
  return <h1>Books List</h1>;
}

function Book() {
  const { id } = useParams();
  const obj: { key: any } = useOutletContext();
  return (
    <h1>
      Book {id} {obj?.key}
    </h1>
  );
}

function NewBook() {
  return <h1>New Book</h1>;
}

function Auth() {
  return <h1>Auth page</h1>;
}

function Dash() {
  return <h1>Dash page</h1>;
}

function Home() {
  const location = useLocation();

  console.log('location', location);
  return <h1>Home {location.state}</h1>;
}

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/books'); // use -1 to simulate back button press
    }, 1000);
  }, []);

  return (
    <h1>
      Not Found
      {/* Auto navigate via component  <Navigate to='/' /> */}
    </h1>
  );
}

function ProtectedRoute() {
  let isAuthed: boolean = true; // = 'isLogged';
  return <div>{isAuthed ? <Outlet /> : <Navigate to='/auth' />}</div>;
}
