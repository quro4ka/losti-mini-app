import React from 'react'

import { FormItem, Pagination, AdaptivityProvider, Select, Input, Checkbox } from '@vkontakte/vkui'
import { useState } from 'react'

const rootContainerStyles = {
  display: 'flex',
  flexDirection: 'row-reverse',
  flexWrap: 'wrap',
  justifyContent: 'center',
}

const demoContainerStyles = {
  flexGrow: 2,
  paddingTop: 24,
  paddingBottom: 24,
}

const propsContainerStyles = { minWidth: 200 }

export const MyPagination = () => {
  const [sizeY, setSizeY] = useState('compact')
  const [currentPage, setCurrentPage] = useState(1)
  const [siblingCount, setSiblingCount] = useState(0)
  const [boundaryCount, setBoundaryCount] = useState(1)
  const [totalPages, setTotalPages] = useState(20)
  const [disabled, setDisabled] = useState(false)

  const handleChange = React.useCallback((page) => {
    setCurrentPage(page)
  }, [])

  return (
    <div style={rootContainerStyles}>
      <AdaptivityProvider sizeY={sizeY}>
        <div style={demoContainerStyles}>
          <Pagination
            currentPage={currentPage}
            siblingCount={siblingCount}
            boundaryCount={boundaryCount}
            totalPages={totalPages}
            disabled={disabled}
            onChange={handleChange}
          />
        </div>
      </AdaptivityProvider>
    </div>
  )
}
