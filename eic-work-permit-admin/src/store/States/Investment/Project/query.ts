import { IProjectEdit, IProjectInput } from "src/models/InvestmentModels/project"

export const FetchProjectsBodyTag = "fetchProjects"
export const FetchProjectsBody = () => ({
  query: `{
    fetchProjects {
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

export const CreateProjectBodyTag = "createProject"
export const CreateProjectBody = (input: IProjectInput) => ({
  query: `mutation {
    createProject(input: {
      title: "${input.title}"
      project_stage: ${input.project_stage}
      environmental_impact: "${input.environmental_impact}"
      project_summary: "${input.project_summary}"
      address: {
        region: "${input.address.region}"
        zone: "${input.address.zone}"
        city: "${input.address.city}"
        sub_city: "${input.address.sub_city}"
        house_number: "${input.address.house_number}"
        email: "${input.address.email}"
        telephone_direct: "${input.address.telephone_direct}"
        telephone_mobile: "${input.address.telephone_mobile}"
        fax: "${input.address.fax}"
        po_box: "${input.address.po_box}"
        other_address: "${input.address.other_address}"
      }
      category_sector: "${input.category_sector}"
      category_sub_sector: "${input.category_sub_sector}"
      category_activity: "${input.category_activity}"
      category_investment_activity: "${input.category_investment_activity}"
    }) {
      ...on IProjectSimple {
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

export const UpdateProjectBodyTag = "updateProject"
export const UpdateProjectBody = (input: IProjectEdit) => ({
  query: `mutation {
    updateProject(input: {
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
      ...on IProjectSimple {
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

export const RemoveProjectBodyTag = "removeOneProject"
export const RemoveProjectBody = (_id: string) => ({
  query: `mutation {
    removeOneProject(_id: "${_id}") {
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