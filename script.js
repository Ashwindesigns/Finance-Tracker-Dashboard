// Finance Tracker App - Pure JavaScript Implementation

class FinanceTracker {
    constructor() {
        this.currentPage = 'dashboard';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeCharts();
        this.showPage('dashboard');
        this.addAnimations();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.currentTarget.dataset.page;
                this.showPage(page);
                this.setActiveNav(e.currentTarget);
            });
        });

        // Notifications
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationDropdown = document.getElementById('notificationDropdown');
        
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.classList.toggle('show');
            document.getElementById('profileDropdown').classList.remove('show');
        });

        // Profile
        const profileBtn = document.getElementById('profileBtn');
        const profileDropdown = document.getElementById('profileDropdown');
        
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
            notificationDropdown.classList.remove('show');
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            notificationDropdown.classList.remove('show');
            profileDropdown.classList.remove('show');
        });

        // Prevent dropdown close when clicking inside
        [notificationDropdown, profileDropdown].forEach(dropdown => {
            dropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });

        // Button hover effects
        this.addButtonEffects();
    }

    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
            
            // Update page title
            const titles = {
                'dashboard': 'Dashboard',
                'income': 'Income Tracking',
                'expenses': 'Expense Management',
                'budget': 'Budget Planning',
                'savings': 'Savings Goals',
                'transactions': 'All Transactions',
                'reports': 'Financial Reports'
            };
            
            document.getElementById('page-title').textContent = titles[pageId] || 'Dashboard';
            
            // Refresh charts if needed
            if (pageId === 'dashboard') {
                this.refreshDashboardCharts();
            } else if (pageId === 'income') {
                this.refreshIncomeChart();
            } else if (pageId === 'expenses') {
                this.refreshExpenseChart();
            } else if (pageId === 'reports') {
                this.refreshReportsCharts();
            }
        }
    }

    setActiveNav(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    initializeCharts() {
        // Dashboard Spending Chart
        const spendingCtx = document.getElementById('spendingChart');
        if (spendingCtx) {
            this.spendingChart = new Chart(spendingCtx, {
                type: 'line',
                data: {
                    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Income',
                        data: [78000, 82000, 79000, 81000, 80500, 84500],
                        borderColor: '#16a34a',
                        backgroundColor: 'rgba(22, 163, 74, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }, {
                        label: 'Expenses',
                        data: [48000, 52000, 49000, 51000, 50500, 52300],
                        borderColor: '#dc2626',
                        backgroundColor: 'rgba(220, 38, 38, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '₹' + value.toLocaleString('en-IN');
                                }
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            });
        }

        // Income Chart
        const incomeCtx = document.getElementById('incomeChart');
        if (incomeCtx) {
            this.incomeChart = new Chart(incomeCtx, {
                type: 'bar',
                data: {
                    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Income',
                        data: [78000, 82000, 79000, 81000, 80500, 84500],
                        backgroundColor: '#16a34a',
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '₹' + value.toLocaleString('en-IN');
                                }
                            }
                        }
                    }
                }
            });
        }

        // Expense Chart
        const expenseCtx = document.getElementById('expenseChart');
        if (expenseCtx) {
            this.expenseChart = new Chart(expenseCtx, {
                type: 'bar',
                data: {
                    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Expenses',
                        data: [48000, 52000, 49000, 51000, 50500, 52300],
                        backgroundColor: '#dc2626',
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '₹' + value.toLocaleString('en-IN');
                                }
                            }
                        }
                    }
                }
            });
        }

        // Reports Charts
        this.initializeReportsCharts();
    }

    initializeReportsCharts() {
        // Income vs Expenses Chart
        const incomeExpenseCtx = document.getElementById('incomeExpenseChart');
        if (incomeExpenseCtx) {
            this.incomeExpenseChart = new Chart(incomeExpenseCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Income',
                        data: [75000, 78000, 80000, 79000, 82000, 81000, 78000, 82000, 79000, 81000, 80500, 84500],
                        borderColor: '#16a34a',
                        backgroundColor: 'rgba(22, 163, 74, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }, {
                        label: 'Expenses',
                        data: [45000, 48000, 47000, 49000, 52000, 50000, 48000, 52000, 49000, 51000, 50500, 52300],
                        borderColor: '#dc2626',
                        backgroundColor: 'rgba(220, 38, 38, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '₹' + value.toLocaleString('en-IN');
                                }
                            }
                        }
                    }
                }
            });
        }

        // Expense Distribution Chart
        const expenseDistributionCtx = document.getElementById('expenseDistributionChart');
        if (expenseDistributionCtx) {
            this.expenseDistributionChart = new Chart(expenseDistributionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Housing', 'Food', 'Transportation', 'Entertainment'],
                    datasets: [{
                        data: [18000, 8750, 6500, 1599],
                        backgroundColor: [
                            '#dc2626',
                            '#16a34a',
                            '#d97706',
                            '#9333ea'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        }
                    }
                }
            });
        }
    }

    refreshDashboardCharts() {
        if (this.spendingChart) {
            this.spendingChart.update();
        }
    }

    refreshIncomeChart() {
        if (this.incomeChart) {
            this.incomeChart.update();
        }
    }

    refreshExpenseChart() {
        if (this.expenseChart) {
            this.expenseChart.update();
        }
    }

    refreshReportsCharts() {
        if (this.incomeExpenseChart) {
            this.incomeExpenseChart.update();
        }
        if (this.expenseDistributionChart) {
            this.expenseDistributionChart.update();
        }
    }

    addAnimations() {
        // Add staggered animations to elements
        const animatedElements = document.querySelectorAll('[class*="stagger-"]');
        animatedElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
        });

        // Add hover effects to cards
        document.querySelectorAll('.stat-card, .card, .chart-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });

        // Add number counter animation
        this.animateCounters();
    }

    animateCounters() {
        document.querySelectorAll('.stat-value').forEach(counter => {
            const target = counter.textContent;
            const numericValue = parseInt(target.replace(/[^\d]/g, ''));
            
            if (numericValue > 0) {
                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        current = numericValue;
                        clearInterval(timer);
                    }
                    
                    // Format based on original format
                    if (target.includes('₹')) {
                        counter.textContent = '₹' + Math.floor(current).toLocaleString('en-IN');
                    } else if (target.includes('%')) {
                        counter.textContent = Math.floor(current * 100 / numericValue) + '%';
                    } else {
                        counter.textContent = Math.floor(current).toLocaleString('en-IN');
                    }
                }, 20);
            }
        });
    }

    addButtonEffects() {
        // Add click effects to buttons
        document.querySelectorAll('button, .btn-primary, .btn-small').forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'translateY(0)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });

        // Add hover effects to navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.1)';
                }
            });

            link.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = '';
                }
            });
        });
    }

    // Utility methods for future enhancements
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('en-IN');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#16a34a' : type === 'error' ? '#dc2626' : '#1976d2'};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Progress bar animation
    animateProgressBars() {
        document.querySelectorAll('.progress-fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // Search functionality for transactions
    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const rows = document.querySelectorAll('.transactions-table tbody tr');
                
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            });
        }
    }

    // Filter functionality
    setupFilters() {
        document.querySelectorAll('.select-dropdown').forEach(select => {
            select.addEventListener('change', (e) => {
                const value = e.target.value;
                const table = e.target.closest('.page').querySelector('.transactions-table');
                
                if (table && value !== 'All Categories') {
                    const rows = table.querySelectorAll('tbody tr');
                    rows.forEach(row => {
                        const categoryBadge = row.querySelector('.category-badge');
                        if (categoryBadge) {
                            const category = categoryBadge.textContent;
                            row.style.display = category === value ? '' : 'none';
                        }
                    });
                } else if (table) {
                    // Show all rows
                    const rows = table.querySelectorAll('tbody tr');
                    rows.forEach(row => {
                        row.style.display = '';
                    });
                }
            });
        });
    }

    // PDF Generation Methods
    async downloadPDFReport() {
        try {
            this.showNotification('Generating PDF report...', 'info');
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Add header
            doc.setFontSize(20);
            doc.text('Financial Report - December 2025', 20, 30);
            doc.setFontSize(12);
            doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 40);
            
            // Add financial summary
            let yPos = 60;
            doc.setFontSize(16);
            doc.text('Financial Summary', 20, yPos);
            yPos += 15;
            
            doc.setFontSize(12);
            const summaryData = [
                ['Total Income:', '₹54,500'],
                ['Total Expenses:', '₹33,250'],
                ['Net Savings:', '₹21,250'],
                ['Savings Rate:', '39.0%']
            ];
            
            summaryData.forEach(([label, value]) => {
                doc.text(label, 20, yPos);
                doc.text(value, 120, yPos);
                yPos += 10;
            });
            
            // Add category breakdown
            yPos += 20;
            doc.setFontSize(16);
            doc.text('Expense Breakdown', 20, yPos);
            yPos += 15;
            
            doc.setFontSize(12);
            const categoryData = [
                ['Housing:', '₹18,000 (34.4%)'],
                ['Food:', '₹8,750 (16.7%)'],
                ['Transportation:', '₹6,500 (12.4%)'],
                ['Entertainment:', '₹1,599 (3.1%)']
            ];
            
            categoryData.forEach(([category, amount]) => {
                doc.text(category, 20, yPos);
                doc.text(amount, 120, yPos);
                yPos += 10;
            });
            
            // Add budget status
            yPos += 20;
            doc.setFontSize(16);
            doc.text('Budget Status', 20, yPos);
            yPos += 15;
            
            doc.setFontSize(12);
            const budgetData = [
                ['Housing:', '82% used (₹4,000 remaining)'],
                ['Food:', '109% used (₹750 over budget)'],
                ['Transportation:', '93% used (₹500 remaining)']
            ];
            
            budgetData.forEach(([category, status]) => {
                doc.text(category, 20, yPos);
                doc.text(status, 120, yPos);
                yPos += 10;
            });
            
            // Add savings goals
            yPos += 20;
            doc.setFontSize(16);
            doc.text('Savings Goals Progress', 20, yPos);
            yPos += 15;
            
            doc.setFontSize(12);
            const savingsData = [
                ['House Down Payment:', '75% complete (₹45,00,000 saved)'],
                ['Vacation Fund:', '64% complete (₹3,20,000 saved)'],
                ['Emergency Fund:', '60% complete (₹18,50,000 saved)']
            ];
            
            savingsData.forEach(([goal, progress]) => {
                doc.text(goal, 20, yPos);
                doc.text(progress, 120, yPos);
                yPos += 10;
            });
            
            // Save the PDF
            doc.save('financial-report-december-2025.pdf');
            this.showNotification('PDF report downloaded successfully!', 'success');
            
        } catch (error) {
            this.showNotification('Error generating PDF report', 'error');
            console.error('PDF generation error:', error);
        }
    }

    async exportTransactionsPDF() {
        try {
            this.showNotification('Exporting transactions to PDF...', 'info');
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Add header
            doc.setFontSize(20);
            doc.text('Transaction History', 20, 30);
            doc.setFontSize(12);
            doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 40);
            
            // Add transactions table
            let yPos = 60;
            doc.setFontSize(14);
            doc.text('Recent Transactions', 20, yPos);
            yPos += 15;
            
            // Table headers
            doc.setFontSize(10);
            doc.text('Date', 20, yPos);
            doc.text('Description', 60, yPos);
            doc.text('Category', 120, yPos);
            doc.text('Amount', 160, yPos);
            yPos += 10;
            
            // Sample transaction data
            const transactions = [
                ['03/04/2025', 'Grocery Store - Big Bazaar', 'Food', '-₹8,750'],
                ['02/04/2025', 'Gas Station - HP', 'Transportation', '-₹6,500'],
                ['01/04/2025', 'Monthly Salary', 'Salary', '+₹42,000'],
                ['30/05/2025', 'Rent Payment', 'Housing', '-₹18,000'],
                ['28/05/2025', 'Freelance Project', 'Freelance', '+₹12,500']
            ];
            
            transactions.forEach(([date, desc, category, amount]) => {
                doc.text(date, 20, yPos);
                doc.text(desc.substring(0, 25), 60, yPos);
                doc.text(category, 120, yPos);
                doc.text(amount, 160, yPos);
                yPos += 8;
            });
            
            // Add summary
            yPos += 20;
            doc.setFontSize(12);
            doc.text('Transaction Summary:', 20, yPos);
            yPos += 10;
            doc.text('Total Income: +₹54,500', 20, yPos);
            yPos += 8;
            doc.text('Total Expenses: -₹33,250', 20, yPos);
            yPos += 8;
            doc.text('Net Amount: +₹21,250', 20, yPos);
            
            doc.save('transactions-export.pdf');
            this.showNotification('Transactions exported successfully!', 'success');
            
        } catch (error) {
            this.showNotification('Error exporting transactions', 'error');
            console.error('Export error:', error);
        }
    }

    async generateCustomReport() {
        try {
            this.showNotification('Generating custom report...', 'info');
            
            // Capture the reports page content
            const reportsContent = document.getElementById('reports-page');
            const canvas = await html2canvas(reportsContent, {
                scale: 1,
                useCORS: true,
                allowTaint: true
            });
            
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'mm', 'a4');
            
            // Add header
            doc.setFontSize(20);
            doc.text('Custom Financial Report', 20, 30);
            doc.setFontSize(12);
            doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 40);
            
            // Add the captured image
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 170;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            doc.addImage(imgData, 'PNG', 20, 50, imgWidth, Math.min(imgHeight, 200));
            
            doc.save('custom-financial-report.pdf');
            this.showNotification('Custom report generated successfully!', 'success');
            
        } catch (error) {
            this.showNotification('Error generating custom report', 'error');
            console.error('Custom report error:', error);
        }
    }

    async downloadQuickReport(reportType) {
        try {
            this.showNotification(`Generating ${reportType} report...`, 'info');
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Add header based on report type
            let title = '';
            let period = '';
            
            switch (reportType) {
                case 'monthly':
                    title = 'Monthly Financial Report';
                    period = 'December 2025';
                    break;
                case 'quarterly':
                    title = 'Quarterly Financial Report';
                    period = 'Q4 2025';
                    break;
                case 'annual':
                    title = 'Annual Financial Report';
                    period = '2025';
                    break;
            }
            
            doc.setFontSize(20);
            doc.text(title, 20, 30);
            doc.setFontSize(14);
            doc.text(period, 20, 45);
            doc.setFontSize(12);
            doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 55);
            
            // Add specific data based on report type
            let yPos = 75;
            
            if (reportType === 'monthly') {
                doc.setFontSize(16);
                doc.text('December 2025 Summary', 20, yPos);
                yPos += 15;
                
                doc.setFontSize(12);
                const monthlyData = [
                    ['Total Income:', '₹54,500'],
                    ['Total Expenses:', '₹33,250'],
                    ['Savings:', '₹21,250'],
                    ['Savings Rate:', '39.0%'],
                    ['Top Expense Category:', 'Housing (₹18,000)'],
                    ['Budget Variance:', '+3.1% over last month']
                ];
                
                monthlyData.forEach(([label, value]) => {
                    doc.text(label, 20, yPos);
                    doc.text(value, 120, yPos);
                    yPos += 10;
                });
                
            } else if (reportType === 'quarterly') {
                doc.setFontSize(16);
                doc.text('Q4 2025 Summary', 20, yPos);
                yPos += 15;
                
                doc.setFontSize(12);
                const quarterlyData = [
                    ['Total Income:', '₹2,43,500'],
                    ['Total Expenses:', '₹1,52,300'],
                    ['Savings:', '₹91,200'],
                    ['Average Monthly Savings:', '₹30,400'],
                    ['Best Month:', 'December (₹21,250 saved)'],
                    ['Growth vs Q3:', '+12.5%']
                ];
                
                quarterlyData.forEach(([label, value]) => {
                    doc.text(label, 20, yPos);
                    doc.text(value, 120, yPos);
                    yPos += 10;
                });
                
            } else if (reportType === 'annual') {
                doc.setFontSize(16);
                doc.text('2025 Annual Summary', 20, yPos);
                yPos += 15;
                
                doc.setFontSize(12);
                const annualData = [
                    ['Total Income:', '₹9,64,800'],
                    ['Total Expenses:', '₹6,14,400'],
                    ['Total Savings:', '₹3,50,400'],
                    ['Average Savings Rate:', '36.3%'],
                    ['Best Quarter:', 'Q4 (₹91,200 saved)'],
                    ['Major Goals Achieved:', '2 of 3 savings goals']
                ];
                
                annualData.forEach(([label, value]) => {
                    doc.text(label, 20, yPos);
                    doc.text(value, 120, yPos);
                    yPos += 10;
                });
            }
            
            // Add footer
            yPos += 20;
            doc.setFontSize(10);
            doc.text('Report generated by FinanceTracker Pro', 20, yPos);
            
            doc.save(`${reportType}-report-${new Date().getFullYear()}.pdf`);
            this.showNotification(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report downloaded!`, 'success');
            
        } catch (error) {
            this.showNotification(`Error generating ${reportType} report`, 'error');
            console.error('Quick report error:', error);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new FinanceTracker();
    
    // PDF Download functionality
    const downloadReportBtn = document.getElementById('downloadReportBtn');
    const exportTransactionsBtn = document.getElementById('exportTransactionsBtn');
    const generateReportBtn = document.getElementById('generateReportBtn');

    if (downloadReportBtn) {
        downloadReportBtn.addEventListener('click', () => {
            app.downloadPDFReport();
        });
    }

    if (exportTransactionsBtn) {
        exportTransactionsBtn.addEventListener('click', () => {
            app.exportTransactionsPDF();
        });
    }

    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', () => {
            app.generateCustomReport();
        });
    }

    // Quick report downloads
    document.querySelectorAll('.report-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const reportType = btn.dataset.report;
            app.downloadQuickReport(reportType);
        });
    });

    // Add demo interactions for other buttons
    document.querySelectorAll('.btn-primary:not(#downloadReportBtn):not(#exportTransactionsBtn):not(#generateReportBtn)').forEach(btn => {
        btn.addEventListener('click', () => {
            app.showNotification('Feature coming soon! This is a demo application.', 'info');
        });
    });

    // Setup search and filters
    app.setupSearch();
    app.setupFilters();
    
    // Animate progress bars when budget page is shown
    document.querySelector('[data-page="budget"]').addEventListener('click', () => {
        setTimeout(() => {
            app.animateProgressBars();
        }, 100);
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.altKey) {
            const keyMap = {
                '1': 'dashboard',
                '2': 'income',
                '3': 'expenses',
                '4': 'budget',
                '5': 'savings',
                '6': 'transactions',
                '7': 'reports'
            };
            
            if (keyMap[e.key]) {
                e.preventDefault();
                app.showPage(keyMap[e.key]);
                document.querySelector(`[data-page="${keyMap[e.key]}"]`).classList.add('active');
            }
        }
    });

    // Add loading states
    document.querySelectorAll('.chart-container').forEach(container => {
        container.style.opacity = '0';
        setTimeout(() => {
            container.style.transition = 'opacity 0.5s ease';
            container.style.opacity = '1';
        }, 500);
    });

    console.log('FinanceTracker Pro initialized successfully!');
    app.showNotification('Welcome to FinanceTracker Pro!', 'success');
});