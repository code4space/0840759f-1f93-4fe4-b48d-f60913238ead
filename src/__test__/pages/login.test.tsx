import Page from '@/app/category/page'
import { render } from '@testing-library/react'

describe('category Page', () => {
    it('render category page', () => {
        const page = render(<Page />)
        expect(page).toMatchSnapshot()
    })
})