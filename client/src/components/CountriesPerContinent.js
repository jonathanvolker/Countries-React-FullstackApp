import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Country from './Country';
import {getCountriesPerContinent} from "../redux/actions";
import CountryListStyled  from "../styledComponents/CountryListStyled"

import CountryStyled from '../styledComponents/CountryStyled';

function CountriesPerContinent ({continent}){

const dispatch=useDispatch(); 
const posts= useSelector((state)=>state.CountryContinent)
useEffect(()=>{
  dispatch(getCountriesPerContinent(continent))
 
},[getCountriesPerContinent])

const [orden,setOrden]=useState(false)

////////manejo de inputs

///////////////////
//funciones para invertir array de paises
const invert=()=>{
  posts.sort(function (a, b) {
    if (a.name > b.name) {
      return -1;
    }
    if (a.name < b.name) {
      return 1;
    }
    
    return 0;
  });
}
const invert2=()=>{
  posts.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    
    return 0;
  });

}
const inverPopulation=()=>{
  posts.sort(function (a, b) {
    if (a.population > b.population) {
      return -1;
    }
    if (a.population < b.population) {
      return 1;
    }
    
    return 0;
  });
}
const inverPopulation2=()=>{
  posts.sort(function (a, b) {
    if (a.population > b.population) {
      return 1;
    }
    if (a.population < b.population) {
      return -1;
    }
    
    return 0;
  });

}


//funciones cambio de orden
const changeOrdenZA=()=>{
  setOrden(true);
  invert();
  
}
const changeOrdenAZ=()=>{
  setOrden(false);
  invert2();
 
}
const changePopulationUp=()=>{
  setOrden(true)
  inverPopulation()
}
const changePopulationDown=()=>{
  setOrden(false)
  inverPopulation2()
}


//seteo estado para iniciar lista
const [state,setState]=useState(false);

//seteo cantidades a la lista
const [currentPage,setCurrentPage]=useState(1);
const [postsPerPage,setPostPerPage]=useState(10);
const pageNumbers=[];
const totalPost= posts.length;
const indexOfLastPost= currentPage*postsPerPage;
const indexOfFirstPost= indexOfLastPost - postsPerPage;
const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);
//ciclo para crear los botones de paginado
for(let i=1; i<= Math.ceil(totalPost /postsPerPage);i++){
    pageNumbers.push(i)
}
//fn para cambiar la pagina
const paginate= (pageNumbers) =>{
  setCurrentPage(pageNumbers)
}

const changeValidation=()=>{ 
  setState(true)  
  
}


  if(orden==false){
  if(state === false){
 
        console.log(posts)

    return(
        
      <CountryListStyled>
         
         <h1>Todos los pises del contienente: {continent}</h1>
         <div key="secondID" className="navOrder">
              <button key="a" className="boton_personalizado" onClick={changeOrdenAZ} >A/Z </button>
              <button key="b" className="boton_personalizado" onClick={changeOrdenZA} >Z/A </button>
              <button key="a" className="boton_personalizado" onClick={changePopulationDown} >poblacion - </button>
              <button key="b" className="boton_personalizado" onClick={changePopulationUp} >poblacion + </button>

         </div>
         <nav className="paginate">
            <ul>
              { pageNumbers.map((number)=>{
                  return ( 
                      <a key={number} className="boton_personalizado"
                      onClick={()=> paginate(number) }>
                        {number} 
                      </a>
                  )
                  })
              }
              </ul>
         </nav>
         <div key="uniqueID" className="countryOrder">
           {
         currentPost.map(({ subregion,name, flag,continent, area, population,ID }) => {
           return (
           <>
              <div key={name} className="country">
                  <Country
                    key={name}
                    flag={flag}
                    name={name}
                    region={continent}
                    subregion={subregion}
                    area={area}
                    population={population}
                    ID={ID}
                    />
               </div>
           </>
           )
         })
       }</div>
       </CountryListStyled>
   )
    
  }

  else{
    currentPost.map(({ name, flag,continent }) => {
      return (<>
      
        <div key={name} className="country">
             <Country
              key={name}
              flag={flag}
              name={name}
              region={continent}
              changeValidation={changeValidation}
              />
          </div>
        </>
     ) })
  }
 }else{
  if(state === false){
      
    return(
        
      <CountryListStyled>
            

              <h1>Todos los pises del contienente: {continent} </h1>
              <div className="navOrder">
                  <button key="a" className="boton_personalizado" onClick={changeOrdenAZ} >A/Z </button>
                  <button key="b" className="boton_personalizado" onClick={changeOrdenZA} >Z/A </button>
                  <button key="a" className="boton_personalizado" onClick={changePopulationDown} >poblacion - </button>
                  <button key="b" className="boton_personalizado" onClick={changePopulationUp} >poblacion + </button>

              </div>
              <nav className="paginate">
                 <ul>
                   {
                     pageNumbers.map((number)=>{
                         return ( 
                         
                             <a key={number} className="boton_personalizado"
                             onClick={()=> paginate(number) } >
                               {number} 
                             </a>
                         )
                         })
                     }
                 </ul>
              </nav>
            <div key="uniqueID" className="countryOrder">
              {currentPost.map(({ subregion,name, flag,continent, area, population,ID }) => {
                  return (
                  <>
                    <div key={name} className="country">
                        <Country
                          key={name}
                          flag={flag}
                          name={name}
                          region={continent}
                          subregion={subregion}
                          area={area}
                          population={population}
                          ID={ID}
                          />
                      </div>
                  </>
                  )
                }) }
            </div>
       </CountryListStyled>
       
   )
      
  }

  else{
    currentPost.map(({ name, flag,continent }) => {
      return (
      <>
        <div key={name} className="country">
            <Country
              key={name}
              flag={flag}
              name={name}
              region={continent}
              changeValidation={changeValidation}
              />
        </div>
      </>
      )
    })
  
  
  
  
  }
 } 
}


export default CountriesPerContinent;