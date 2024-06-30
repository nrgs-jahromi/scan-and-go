import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import { Box, Paper, TextField, IconButton } from '@mui/material';
import PageHeader from "../../pageHeader/PageHeader";
import { AddCircle } from 'iconsax-react';
import theme from '../../../../theme';

interface TreeViewBaseItem {
  id: string;
  label: string;
  children?: TreeViewBaseItem[];
}

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    direction: 'rtl',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginRight: 15,
    paddingRight: 18,
    borderRight: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    direction: 'rtl',
  },
}));

const initialTreeItems: TreeViewBaseItem[] = [
  {
    id: '1',
    label: 'لوازم تحریر',
    children: [
      {
        id: '2',
        label: 'نوشت‌افزار',
        children: [
          { id: '3', label: 'خودکار' },
          { id: '4', label: 'مداد' },
          { id: '5', label: 'ماژیک' },
          { id: '6', label: 'روان‌نویس' },
        ],
      },
      {
        id: '7',
        label: 'دفتر و کاغذ',
        children: [
          {
            id: '8',
            label: 'دفتر مشق',
            children: [
              { id: '21', label: 'دفتر مشق 40 برگ' },
              { id: '22', label: 'دفتر مشق 60 برگ' },
              { id: '23', label: 'دفتر مشق 80 برگ' },
            ],
          },
          {
            id: '9',
            label: 'دفتر نقاشی',
            children: [
              { id: '24', label: 'دفتر نقاشی 40 برگ' },
              { id: '25', label: 'دفتر نقاشی 60 برگ' },
              { id: '26', label: 'دفتر نقاشی 80 برگ' },
            ],
          },
          { id: '10', label: 'کاغذ A4' },
        ],
      },
      {
        id: '11',
        label: 'لوازم جانبی',
        children: [
          { id: '12', label: 'پاک‌کن' },
          { id: '13', label: 'تراش' },
          { id: '14', label: 'خط‌کش' },
          { id: '15', label: 'پوشه و زونکن' },
        ],
      },
      {
        id: '16',
        label: 'لوازم نقاشی و رنگ‌آمیزی',
        children: [
          { id: '17', label: 'آبرنگ' },
          { id: '18', label: 'مدادرنگی' },
          { id: '19', label: 'پاستل' },
          { id: '20', label: 'گواش' },
        ],
      },
    ],
  },
];

function ExpandIcon(props: React.ComponentProps<typeof AddBoxRoundedIcon>) {
  return <AddBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function CollapseIcon(props: React.ComponentProps<typeof IndeterminateCheckBoxRoundedIcon>) {
  return <IndeterminateCheckBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function EndIcon(props: React.ComponentProps<typeof DisabledByDefaultRoundedIcon>) {
  return <DisabledByDefaultRoundedIcon {...props} sx={{ opacity: 0.3 }} />;
}

const BorderedTreeView: React.FC = () => {
  const [treeItems, setTreeItems] = useState<TreeViewBaseItem[]>(initialTreeItems);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');

  const handleDoubleClick = (id: string, label: string) => {
    setEditingItem(id);
    setEditingValue(label);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.target.value);
  };

  const handleInputBlur = () => {
    if (editingItem !== null) {
      const updateLabel = (items: TreeViewBaseItem[]): TreeViewBaseItem[] => {
        return items.map(item => {
          if (item.id === editingItem) {
            return { ...item, label: editingValue };
          }
          if (item.children) {
            return { ...item, children: updateLabel(item.children) };
          }
          return item;
        });
      };
      setTreeItems(updateLabel(treeItems));
      setEditingItem(null);
      setEditingValue('');
    }
  };

  const handleAddChild = (id: string) => {
    const addNewChild = (items: TreeViewBaseItem[]): TreeViewBaseItem[] => {
      return items.map(item => {
        if (item.id === id) {
          const newChild: TreeViewBaseItem = {
            id: Math.random().toString(36).substr(2, 9),
            label: 'آیتم جدید',
          };
          return {
            ...item,
            children: item.children ? [...item.children, newChild] : [newChild],
          };
        }
        if (item.children) {
          return { ...item, children: addNewChild(item.children) };
        }
        return item;
      });
    };
    setTreeItems(addNewChild(treeItems));
  };

  const renderTreeNodes = (nodes?: TreeViewBaseItem[]) => {
    return nodes?.map((node) => (
      <CustomTreeItem key={node.id} itemId={node.id} label={
        <Box width={"100%"} sx={{ display: "flex", justifyContent: "space-between"  , alignItems:"center"}} >
        
          {editingItem === node.id ? (
            <TextField
              value={editingValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              autoFocus
            />
          ) : (
            <span onDoubleClick={() => handleDoubleClick(node.id, node.label)}>{node.label}</span>
          )}
          <IconButton onClick={() => handleAddChild(node.id)} size="small">
            <AddCircle color={theme.palette.primary.light} />
          </IconButton>
        </Box>
      }>
        {node.children && renderTreeNodes(node.children)}
      </CustomTreeItem>
    ));
  };

  return (
    <>
      <PageHeader title="دسته‌بندی محصولات" />
      <Box component={Paper} width={"100%"} height={"90%"} p={4} >
        <SimpleTreeView
          aria-label="customized"
          defaultExpandedItems={['1', '2', '7', '11', '16']}
          slots={{
            expandIcon: ExpandIcon,
            collapseIcon: CollapseIcon,
            endIcon: EndIcon,
          }}
          sx={{ overflowX: 'hidden', minHeight: 270, flexGrow: 1, maxWidth: "100%" , mb:4 }}
        >
          {renderTreeNodes(treeItems)}
        </SimpleTreeView>
      </Box>
    </>
  );
};

export default BorderedTreeView;
