class CreateJobPostDTO {
    constructor({ title, companyName, payRange, workLocation, description }) {
        this.title = title;
        this.companyName = companyName;
        this.payRange = payRange;
        this.workLocation = workLocation;
        this.description = description;
    }
}
export default CreateJobPostDTO;