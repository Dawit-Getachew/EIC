import { IProductEdit, IProductInput } from "src/models/InvestmentModels/product"

export const FetchProductsBodyTag = "fetchProducts"
export const FetchProductsBody = () => ({
  query: `{
    fetchProducts {
      _id
      product_name
      is_service
      quantity
      domestic_market_share
      export_market_share
      unit
      createdAt
      updatedAt
    }
  }`
})

export const CreateManyProductsBodyTag = "createManyProducts"
export const CreateManyProductsBody = (inputs: IProductInput[]) => ({
  query: `mutation {
    createManyProducts(input: {
      products: [${inputs.map(item => `{
        product_name: "${item.product_name}"
        is_service: ${item.is_service}
        quantity: ${item.quantity}
        unit: ${item.unit}
        domestic_market_share: ${item.domestic_market_share}
        export_market_share: ${item.export_market_share}
      }`)}]
    }) {
      _id
      product_name
      is_service
      quantity
      domestic_market_share
      export_market_share
      unit
      createdAt
      updatedAt
    }
  }`
})

export const CreateProductBodyTag = "createProduct"
export const CreateProductBody = (input: IProductInput) => ({
  query: `mutation {
    createProduct(input: {
      title: "title"
      project_stage: INITIAL
      environmental_impact: "environmental_impact"
      project_summary: "project_summary"
      address: {
        region: "String"
        zone: "String"
        city: "String"
        sub_city: "String"
        house_number: "String"
        email: "String"
        telephone_direct: "String"
        telephone_mobile: "String"
        fax: "String"
        po_box: "String"
        other_address: "String"
      }
      category_sector: "61f940e0c592db64b5bec50f"
      category_sub_sector: "61f940e0c592db64b5bec54c"
      category_activity: "61f940e0c592db64b5bec595"
      category_investment_activity: "61f940e1c592db64b5bec664"
    }) {
      ...on IProductSimple {
        _id
        title
        project_stage
        environmental_impact
        project_summary
        category_sector
        category_sub_sector
        category_activity
        category_investment_activity
        address {
          region
          zone
          city
          kebele
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        createdAt
        updatedAt
      }

      ...on ValidationError {
        errors {
          error_code
          error_message
        }
        error_path
      }

      ...on SystemError {
        error_code
        error_message
      }

      ...on ValidationErrors {
        validation_errors {
          error_path
          errors {
            error_code
            error_message
          }
        }
      }
    }
  }`
})

export const UpdateProductBodyTag = "updateProduct"
export const UpdateProductBody = (input: IProductEdit) => ({
  query: `mutation {
    updateProduct(input: {
      _id: "61fa37597daecd8dd796a43d"
      title: "titlessss"
      project_stage: INITIAL
      environmental_impact: "environmental_impact"
      project_summary: "project_summary"
      address: {
        region: "String"
        zone: "String"
        city: "String"
        sub_city: "String"
        house_number: "String"
        email: "String"
        telephone_direct: "String"
        telephone_mobile: "String"
        fax: "String"
        po_box: "String"
        other_address: "String"
      }
      category_sector: "61f940e0c592db64b5bec50f"
      category_sub_sector: "61f940e0c592db64b5bec54c"
      category_activity: "61f940e0c592db64b5bec595"
      category_investment_activity: "61f940e1c592db64b5bec664"
    }) {
      ...on IProductSimple {
        _id
        title
        project_stage
        environmental_impact
        project_summary
        category_sector
        category_sub_sector
        category_activity
        category_investment_activity
        address {
          region
          zone
          city
          kebele
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
        createdAt
        updatedAt
      }

      ...on ValidationError {
        errors {
          error_code
          error_message
        }
        error_path
      }

      ...on SystemError {
        error_code
        error_message
      }

      ...on ValidationErrors {
        validation_errors {
          error_path
          errors {
            error_code
            error_message
          }
        }
      }
    }
  }`
})

export const RemoveProductBodyTag = "removeOneProduct"
export const RemoveProductBody = (_id: string) => ({
  query: `mutation {
    removeOneProduct(_id: "${_id}") {
      _id
      title
      project_stage
      environmental_impact
      project_summary
      category_sector
      category_sub_sector
      category_activity
      category_investment_activity
      address {
        region
        zone
        city
        kebele
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      createdAt
      updatedAt
    }
  }`
})