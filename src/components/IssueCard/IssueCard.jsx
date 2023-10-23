// eslint-disable-next-line react/prop-types
const IssueCard = ({ summary, description }) => {
  return (
    <div className="flex flex-col gap-4 bg-gray-700 p-4 rounded-lg">
      <div className="flex justify justify-between">
        <div className="flex gap-2">
          <div className="w-7 h-7 text-center rounded-full bg-yellow-500">A</div>
          <span>{summary}</span>
        </div>
      </div>
                
      <div> {description}</div>
        {/* <div className="flex justify-between">
          <span>Feb 13, 2021</span>
        </div> */}
    </div>
  )
}

export default IssueCard