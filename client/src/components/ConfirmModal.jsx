export default function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow">
                <p className="mb-4">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button onClick={onCancel} className="btn">Cancel</button>
                    <button onClick={onConfirm} className="btn bg-red-600">Delete</button>
                </div>
            </div>
        </div>
    );
}
