import { useState } from 'react'
import logoSvg from '../assets/Bhaiya.svg'
import './EstimateCalculator.css'

const EstimateCalculator = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        category: 'residential',
        workType: 'modern',
        squareFeet: '',
        percentage: '100'
    })
    const [estimate, setEstimate] = useState(null)

    // Listen for custom open-estimate-modal event from Navbar or anywhere on page
    useEffect(() => {
        const handleOpen = () => setIsOpen(true)
        window.addEventListener('open-estimate-modal', handleOpen)
        return () => window.removeEventListener('open-estimate-modal', handleOpen)
    }, [])

    // Escape key and body scroll lock
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsOpen(false)
        }
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [isOpen])

    const basePrices = {
        residential: { luxury: 2500, modern: 1800, minimalistic: 1200 },
        commercial: { luxury: 3500, modern: 2500, minimalistic: 1800 }
    }

    const calculateEstimate = (e) => {
        e.preventDefault()
        const basePrice = basePrices[formData.category][formData.workType]
        const sqft = parseFloat(formData.squareFeet)
        const percentage = parseFloat(formData.percentage) / 100

        const totalCost = basePrice * sqft * percentage
        setEstimate(totalCost)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setEstimate(null)
    }

    return (
        <>
            {/* Vertical Button */}
            <button
                className="estimate-button-vertical"
                onClick={() => setIsOpen(true)}
                title="Get Estimate"
            >
                <span className="estimate-btn-text">GET ESTIMATES</span>
            </button>

            {/* Popup Modal */}
            {isOpen && (
                <div className="estimate-modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="estimate-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setIsOpen(false)}>✕</button>

                        <div className="modal-header">
                            <div className="modal-logo-wrap">
                                <img src={logoSvg} alt="Rishikesh Interior Logo" className="modal-header-logo" />
                                <span className="modal-logo-glow" />
                            </div>
                            <h2>Project Cost Estimator</h2>
                            <p>Bespoke Consultation • Calculate investment for your space</p>
                        </div>

                        <form className="estimate-form" onSubmit={calculateEstimate}>
                            <div className="form-row">
                                <div className="form-group-estimate">
                                    <label>Project Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="residential">Residential</option>
                                        <option value="commercial">Commercial</option>
                                    </select>
                                </div>

                                <div className="form-group-estimate">
                                    <label>Work Type</label>
                                    <select
                                        name="workType"
                                        value={formData.workType}
                                        onChange={handleChange}
                                    >
                                        <option value="luxury">Luxury</option>
                                        <option value="modern">Modern</option>
                                        <option value="minimalistic">Minimalistic</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group-estimate">
                                    <label>Square Feet</label>
                                    <input
                                        type="number"
                                        name="squareFeet"
                                        value={formData.squareFeet}
                                        onChange={handleChange}
                                        placeholder="Enter area"
                                        required
                                        min="1"
                                    />
                                </div>

                                <div className="form-group-estimate">
                                    <label>Work Percentage (%)</label>
                                    <input
                                        type="number"
                                        name="percentage"
                                        value={formData.percentage}
                                        onChange={handleChange}
                                        placeholder="100"
                                        required
                                        min="1"
                                        max="100"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn-calculate">
                                Calculate Estimate
                            </button>

                            {estimate && (
                                <div className="estimate-result">
                                    <h3>Estimated Cost</h3>
                                    <div className="cost-amount">
                                        ₹{estimate.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                    </div>
                                    <p className="estimate-note">
                                        *This is an approximate estimate. Final cost may vary based on materials, finishes, and specific requirements.
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default EstimateCalculator
