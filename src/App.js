import React from 'react';
import './App.css';

const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class ProductsRow extends React.Component{
    render() {
        const {products} = this.props
        const name = products.stocked ? products.name : <span style={{color:'red'}}>{products.name}</span>
        return (
            <tr>
              <td>{name}</td>
              <td>{products.price}</td>
            </tr>
        );
    }
}

class ProductsCategory extends React.Component{
    render() {
        const {category} = this.props
        return (
            <tr>
              <th colSpan="2">{category}</th>
            </tr>
        );
    }
}

class ProductsTable extends React.Component {

    render() {
        const {products,inStockOnly,filterText} = this.props
        let lastCategory = null
        let newTab = []
        products.forEach(product =>{
          if ((inStockOnly && !product.stocked) || product.name.indexOf(filterText) === -1){
            return
          }
          if (product.category !== lastCategory){
            lastCategory = product.category
            newTab.push(<ProductsCategory key={product.category} category={product.category} />)
          }
          newTab.push(<ProductsRow key={product.name} products={product}/>)
        })

        return (
            <div>
                <table>
                    <thead>
                      <tr>
                          <th>Nom</th>
                          <th>Prix</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newTab}
                    </tbody>
                </table>
            </div>
        )
    }
}

class SearchBar extends React.Component{
  constructor(props){
    super(props)
    this.handleFilterTextChange= this.handleFilterTextChange.bind(this)
    this.handleInStockChange = this.handleInStockChange.bind(this)
  }

  handleFilterTextChange(e){
    this.props.onFilterTextChange(e.target.value)
  }

  handleInStockChange(e){
      this.props.onStockChange(e.target.checked)
  }

  render() {
    const {filterText,inStockOnly} = this.props
      return (
          <div>
            <div>
                <input type="text" id="search" value={filterText} name="serch" placeholder="Recherchez"
                onChange={this.handleFilterTextChange}
                />
            </div>
            <div>
                <input type="checkbox" id="stock" checked={inStockOnly} onChange={this.handleInStockChange}/>
                <label htmlFor="stock">Produit en stock seuelement</label>
            </div>
          </div>
      );
  }
}

class FilteredProductsTable extends React.Component{
  constructor(props){
    super(props)
      this.state={
        filterText:"",
        inStockOnly:false
      }
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
      this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this)
  }

  handleFilterTextChange(filterText){
    this.setState({
        filterText:filterText
    })
  }

  handleInStockOnlyChange(inStockOnly){
      this.setState({
          inStockOnly:inStockOnly
      })
  }

  render(){
    const {products} = this.props
    return <div>
        <SearchBar
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            onFilterTextChange={this.handleFilterTextChange}
            onStockChange={this.handleInStockOnlyChange}
        />
        <ProductsTable
            products={products}
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
        />
    </div>
  }
}

class App extends React.Component{
  render(){
      return <FilteredProductsTable products={PRODUCTS}/>
  }
}

export default App;
