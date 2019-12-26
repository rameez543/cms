import React from 'react';
import '../styles/AddProduct.css'
export class AddProduct extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openModal: false,
            selectedCategory: 0, selectedBrand: 0, selectedParentCategory: null
        }
    }
    handleClick=()=>{
        this.setState({openModal:true})
    }
    handleChange = (e)=>{
        console.log(e.target.name)
        if(e.target.name === 'category'){
            this.setState({selectedCategory:e.target.value})
        }
    }
   modal =()=>{
       const { category,brand } = this.props
       const { openModal ,selectedCategory, selectedBrand} = this.state
       return (
           <div id="myModal" className="modal" style={{ display: openModal ? 'block' : 'none' }}>

               <div className="modal-content" >

                   <span className="close" onClick={() => this.setState({ openModal: false })}>X</span>
                   <div>
                       <h3>select category</h3>
                       <select value ={selectedCategory} onChange={this.handleChange} name= 'category'>
                           {category && category.map(category => <option value={category.id}>{category.categoryName}</option>)}
                       </select>
                       <span style={{margin:'4px'}}><button onClick ={()=>this.setState({showAddCategory:true})}>+</button></span>
                       {this.addCategory()}
                   </div>
                   <div>
                   <h3>select brand</h3>
                       <select value ={selectedBrand} onChange={this.handleChange} name= 'brand'>
                           {brand && brand.map(brand => <option value={brand.id}>{brand.brandName}</option>)}
                       </select>
                   </div>
               </div>

           </div>
      
       )
   }
   addCategory =()=>{
    const {category,selectedParentCategory} = this.props
    const {showAddCategory} = this.state
      return(<div>{
          showAddCategory && <div style={{margin:'4px'}}>
             <span>category name </span><input type ='text'></input>
             <div>
                 <span>select parent category</span>
             <select value ={selectedParentCategory} onChange={this.handleChange} name= 'category'>
                            <option value={null}>null</option>
                           {category && category.map(category => <option value={category.id}>{category.categoryName}</option>)}
                       </select>
             </div>
             
          </div>
          }
        </div>)
  }

    render(){
        console.log('select',this.state.selectedCategory)
        return(
            <div >
                <button  className ='btn' onClick={this.handleClick}>Add Product</button>
                {this.modal()}
            </div>
        )
    }
}