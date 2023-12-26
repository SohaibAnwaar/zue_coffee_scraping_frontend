import React from 'react';
import MapWrapper from './MapWrapper';
import 'leaflet/dist/leaflet.css';

const index = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
<h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
<span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Zue Outlets</span> 
</h1>
        
    <MapWrapper/>
    </div>
  )
}

export default index